"use client";

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAppSelector } from '@/store/hook';
import { RootState } from '@/store';
import CartItem from './cartItem';
import { useRouter } from 'next/navigation';

function Cart() {
    const order = useAppSelector((state: RootState) => state.order);
    const products = useAppSelector((state: RootState) => state.product);
    const router = useRouter();

    return (
        <div className="bg-white h-full rounded-xl shadow p-4 flex flex-col border border-gray-200 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-2 border-b pb-4 mb-4">
                <ShoppingCart className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl font-semibold">Your Cart</h2>
            </div>

            {/* Empty Cart */}
            {order.orderItems.length === 0 ? (
                <p className="text-gray-500 text-center text-sm">
                    You haven't added any items yet.
                </p>
            ) : (
                <>
                    <div className="max-h-128 overflow-y-auto space-y-4 mb-2 pb-2">
                        {order.orderItems.map((item) => {
                            const product = products[item.productId];
                            if (!product) return null;

                            return (
                                <CartItem product={product} quantity={item.quantity} key={item.productId} />
                            );
                        })}
                    </div>

                    {/* Total and Checkout */}
                    <div className="mt-auto border-t pt-4 flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-lg font-bold">{order.totalPrice.toFixed(2)} DKK</span>
                    </div>

                    <button
                        onClick={() => router.push('/checkout')}
                        className="mt-4 bg-amber-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition text-sm font-semibold"
                    >
                        Proceed to Checkout
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;
