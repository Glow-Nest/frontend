import React from "react";
import { ShoppingCart, Eye } from "lucide-react";

interface ProductCardProps {
    name: string;
    price: number;
    imageUrl: string;
    id: string;
    onAddToCart?: () => void;
}

const ProductCard = ({ name, price, imageUrl, id, onAddToCart }: ProductCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all overflow-hidden flex flex-col">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-48 object-cover"
            />

            <div className="p-4 flex justify-between items-start">
                {/* name and price */}
                <div>
                    <h3 className="text-base font-medium text-gray-800 mb-1 truncate">{name}</h3>
                    <p className="text-amber-600 font-semibold text-sm">{price.toFixed(2)} kr.</p>
                </div>

                {/* icons */}
                <div className="flex flex-col items-end gap-2">
                    <button onClick={onAddToCart} className="text-gray-600 hover:text-amber-500 cursor-pointer">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
