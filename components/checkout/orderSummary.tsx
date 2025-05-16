"use client";

import { RootState } from '@/store';
import { useAppSelector } from '@/store/hook';
import React from 'react';
import CartItem from '../products/cartItem';

function OrderSummary({ readOnly = false }: { readOnly?: boolean }) {
    const order = useAppSelector((state: RootState) => state.order);
    const products = useAppSelector((state: RootState) => state.product);

    return (
        <div className="bg-[#f9f9fb] text-gray-800 p-6 rounded-xl max-w-md mx-auto font-sans">
            <p className="text-center text-sm mb-1">Total amount</p>
            <h1 className="text-center text-4xl font-bold text-amber-600">
                {order.totalPrice} kr.
            </h1>
            <p className="text-center text-xs text-green-600 font-medium mt-1">🔒 Secure Payment</p>

            <div className="border-t my-6"></div>

            <p className="text-sm font-medium mb-2">Order Summary</p>

            <div className="max-h-72 overflow-y-auto space-y-4 mb-2 pb-2">
                {order.orderItems.map((item) => {
                    const product = products[item.productId];
                    if (!product) return null;

                    return (
                        <CartItem
                            product={product}
                            quantity={item.quantity}
                            readonly={readOnly}
                            key={item.productId}
                        />
                    );
                })}
            </div>

            <div className="text-sm text-gray-600 mt-4 space-y-1">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{order.totalPrice} kr.</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>0.00 kr.</span>
                </div>
            </div>

            <div className="flex justify-between font-semibold text-sm mt-4">
                <span>Total</span>
                <span className="text-black">{order.totalPrice} kr.</span>
            </div>
        </div>
    );
}

export default OrderSummary;
