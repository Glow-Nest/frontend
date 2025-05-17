"use client";

import React from "react";
import { useAppDispatch } from "@/store/hook";
import { removeProductFromOrder, updateProductQuantity } from "@/store/slices/order/orderSlice";
import { ProductWithId } from "libs/types/ProductTypes";

interface CartItemProps {
    product: ProductWithId;
    quantity: number;
    readonly? : boolean
}
function CartItem({ product, quantity, readonly = false }: CartItemProps) {
    const dispatch = useAppDispatch();

    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!readonly) {
            dispatch(updateProductQuantity({ productId: product.productId, quantity: parseInt(e.target.value) }));
        }
    };

    const handleRemove = () => {
        if (!readonly) {
            dispatch(removeProductFromOrder(product.productId));
        }
    };

    return (
        <div className="flex items-center gap-2 p-2 rounded-md shadow-md hover:shadow-lg transition bg-white relative">
            <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col flex-grow">
                <p className="font-semibold text-sm truncate">{product.name}</p>
                <div className="flex justify-between text-sm mt-2">
                    <div className="flex items-center gap-1">
                        <label htmlFor={`qty-${product.productId}`} className="text-gray-600">Qty:</label>
                        <select
                            id={`qty-${product.productId}`}
                            value={quantity}
                            onChange={handleQuantityChange}
                            disabled={readonly}
                            className={`border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none ${
                                readonly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'focus:ring focus:ring-amber-500'
                            }`}
                        >
                            {[...Array(product.inventoryCount)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <span className="font-medium text-black">
                        {(product.price * quantity).toFixed(2)} DKK
                    </span>
                </div>
            </div>

            {!readonly && (
                <button
                    onClick={handleRemove}
                    className="absolute top-2 right-2 text-gray-400 cursor-pointer hover:text-red-500 text-xl leading-none"
                    aria-label="Remove item"
                >
                    ×
                </button>
            )}
        </div>
    );
}

export default CartItem;
