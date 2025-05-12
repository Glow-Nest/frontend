"use client";

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { RootState } from '@/store';
import { addProductToOrder, removeProductFromOrder, updateProductQuantity } from '@/store/slices/order/orderSlice';

function Cart() {
    const dispatch = useAppDispatch();
    const order = useAppSelector((state: RootState) => state.order);
    const products = useAppSelector((state: RootState) => state.product);

    const handleQuantityChange = (productId: string, quantity: number) => {
        dispatch(updateProductQuantity({ productId, quantity }));
    };

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
                <div className="space-y-4">
                    {order.orderItems.map((item) => {
                        const product = products[item.productId];
                        if (!product) return null;

                        return (
                            <div
                                key={item.productId}
                                className="flex items-center gap-2 p-2 rounded-md shadow-md border-gray-900 hover:shadow-lg transition bg-white relative"
                            >
                                {/* Product Image */}
                                <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex flex-col flex-grow">
                                    <p className="font-semibold text-sm truncate">{product.name}</p>
                                    <div className="flex justify-between text-sm mt-2">

                                        <div className="flex items-center gap-1">
                                            <label htmlFor={`qty-${item.productId}`} className="text-gray-600">
                                                Qty:
                                            </label>
                                            <select
                                                id={`qty-${item.productId}`}
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(item.productId, parseInt(e.target.value))
                                                }
                                                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-amber-500"
                                            >

                                                {[...Array(product.inventoryCount)].map((_, i) => (
                                                    <option key={i + 1} value={i + 1}>
                                                        {i + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>


                                        <span className="font-medium text-black">
                                            {(product.price * item.quantity).toFixed(2)} DKK
                                        </span>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => dispatch(removeProductFromOrder(item.productId))}
                                    className="absolute top-2 right-2 text-gray-400 cursor-pointer hover:text-red-500 text-xl leading-none"
                                    aria-label="Remove item"
                                >
                                    ×
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Cart;
