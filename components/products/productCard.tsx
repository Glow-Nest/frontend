"use client";

import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
    addProductToOrder,
    removeProductFromOrder
} from "@/store/slices/order/orderSlice";
import { useLazyGetProductByIdQuery } from "@/store/api/productApi";
import toast from "react-hot-toast";
import { setProduct } from "@/store/slices/product/productSlice";

interface ProductCardProps {
    name: string;
    price: number;
    imageUrl: string;
    id: string;
}

function ProductCard({ name, price, imageUrl, id }: ProductCardProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const orderItems = useAppSelector((state) => state.order.orderItems);
    const isInCart = orderItems.some(item => item.productId === id);

    const [trigger, result] = useLazyGetProductByIdQuery();

    const handleCardClick = () => {
        router.push(`/products/${id}`);
    };

    const handleAddClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const response = await trigger({ productId: id }).unwrap();
            dispatch(setProduct(response));
            dispatch(addProductToOrder({ productId: id, priceWhenOrdering: response.price, quantity: 1 }));
        } catch (err) {
            toast.error("Failed to fetch product.");
        }
    };


    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(removeProductFromOrder(id));
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all overflow-hidden flex flex-col cursor-pointer"
        >
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-48 object-cover"
            />

            <div className="p-4 flex justify-between items-start">
                <div>
                    <h3 className="text-base font-medium text-gray-800 mb-1 max-w-30">{name}</h3>
                    <p className="text-amber-600 font-semibold text-sm">{price.toFixed(2)} kr.</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <button
                        onClick={isInCart ? handleRemoveClick : handleAddClick}
                        className={`text-gray-600 hover:${isInCart ? "text-red-500" : "text-amber-500"
                            }`}
                    >
                        {isInCart ? (
                            <Trash2 className="w-5 h-5 cursor-pointer" />
                        ) : (
                            <ShoppingCart className="w-5 h-5 cursor-pointer" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
