"use client"

import React, { useState } from 'react';
import Navbar from '@/components/common/MainNavbar';
import ProgressIndicator from '@/components/checkout/progressIndicator';
import UserDetails from '@/components/checkout/userDetails';
import OrderSummary from '@/components/checkout/orderSummary';
import { Store } from 'lucide-react';
import DatePicker from '@/components/appointments/DatePicker';
import PaymentForm from '@/components/checkout/PaymentForm';

function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleContinue = () => {
        setStep(2);
    };

    return (
        <div>
            <Navbar />

            <div className='min-h-screen pt-20'>
                {/* Pickup Message */}
                <div className="border-l-4 border-amber-500 flex bg-amber-50 p-5 rounded-md shadow-sm w-5xl mx-auto gap-3">
                    <Store className="w-6 h-6 text-amber-500 mt-1" />
                    <div>
                        <h3 className="text-base font-semibold text-amber-700">Pickup Only <span></span></h3>
                        <p className="text-sm text-amber-800">
                            Products must be picked up at the salon. Delivery is currently not available.
                        </p>
                    </div>
                </div>

                {/* progress indicator */}
                <div>
                    <ProgressIndicator step={step} />
                </div>

                <div className='flex'>
                    <div className="flex-2/3">
                        {/* Step 1: User Details */}
                        {step === 1 && (
                            <div className='max-w-3xl mx-auto'>
                                <UserDetails />

                                <h2 className="text-xl font-bold text-gray-900">Pickup Date
                                    <span className="font-medium text-sm text-gray-900">
                                        ( {selectedDate.toLocaleDateString()})
                                    </span>
                                </h2>

                                <div className=' p-4 space-y-8 mb-4'>
                                    <DatePicker onSelect={setSelectedDate} />
                                </div>

                                <div className="w-full max-w-xl mx-auto px-4 mt-1 mb-1">
                                    <button
                                        onClick={handleContinue}
                                        className="w-full bg-amber-500 hover:bg-amber-600 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg shadow-sm transition"
                                    >
                                        Continue to Payment
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Card Payment Placeholder */}
                        {step === 2 && (
                            <div className="w-full max-w-xl mx-auto px-4 py-8">
                                <PaymentForm onBack={() => setStep(1)} />
                            </div>
                        )}

                    </div>

                    <div className='flex-1/3'>
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
