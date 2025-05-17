"use client";

import DatePicker from '@/components/appointments/DatePicker';
import CheckoutLayout from '@/components/checkout/CheckoutLayout';
import UserDetails from '@/components/checkout/userDetails';
import { RootState } from '@/store';
import { useCreateCheckoutSessionMutation, useCreateOrderMutation } from '@/store/api/orderApi';
import { useAppSelector } from '@/store/hook';
import { addClientIdToOrder, addPickupDate, clearOrder } from '@/store/slices/order/orderSlice';
import { loadStripe } from '@stripe/stripe-js';
import { format } from 'date-fns';
import { extractFirstErrorMessage } from 'libs/helpers';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

function CheckoutPage() {

    const dispatch = useDispatch();
    const router = useRouter();

    const user = useAppSelector((state: RootState) => state.user);
    const order = useAppSelector((state: RootState) => state.order);
    const selectedDate = useAppSelector((state: RootState) => state.order.pickupDate);

    const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
    const [createCheckoutSession] = useCreateCheckoutSessionMutation();

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        console.warn("Stripe public key is missing. Check your .env file.");
    }

    const handleSelectedDate = (date: Date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        dispatch(addPickupDate(formattedDate));
    };


    const handleContinue = async () => {
        if (!user.id) {
            toast.error("User is null. Cannot proceed.");
            return;
        }

        const toastId = toast.loading("Creating your order...");

        const payload = {
            ...order,
            clientId: user.id,
        };

        try {
            //create order
            const orderResponse = await createOrder(payload).unwrap();
            toast.success("Order created!", { id: toastId });

            dispatch(clearOrder());

            //initiate stripe checkout
            const stripe = await stripePromise;
            const sessionResponse = await createCheckoutSession(orderResponse.orderId).unwrap();

            if (stripe) {
                await stripe.redirectToCheckout({ sessionId: sessionResponse.sessionId });
            } else {
                router.push("/checkout/failure");
            }
        } catch (error: unknown) {
            const msg = extractFirstErrorMessage(error, "Failed to create order.");
            toast.error(msg, { id: toastId });
        }
    };

    return (
        <div>
            <CheckoutLayout step={1} readonly={false}>

                <div className='max-w-3xl mx-auto'>
                    <UserDetails />

                    <h2 className="text-xl font-bold text-gray-900">Pickup Date
                        <span className="font-medium text-sm text-gray-900">
                            ( {selectedDate})
                        </span>
                    </h2>

                    <div className=' p-4 space-y-8 mb-4'>
                        <DatePicker onSelect={handleSelectedDate} />
                    </div>

                    <div className="w-full max-w-xl mx-auto px-4 mt-1 mb-1">
                        <button
                            onClick={handleContinue}
                            disabled={!user.email}
                            className={`w-full py-3 px-6 rounded-lg shadow-sm transition font-semibold ${user.email
                                ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Continue to Payment
                        </button>

                    </div>
                </div>

            </CheckoutLayout>
        </div>

    )
}

export default CheckoutPage;