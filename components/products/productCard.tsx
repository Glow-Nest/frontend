import React from "react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    name: string;
    price: number;
    imageUrl: string;
    id: string;
    onAddToCart?: () => void;
}

function ProductCard({ name, price, imageUrl, id, onAddToCart }: ProductCardProps) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/products/${id}`);
    };

    const handleIconClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToCart?.();
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
                    <h3 className="text-base font-medium text-gray-800 mb-1 max-w-30 ">{name}</h3>
                    <p className="text-amber-600 font-semibold text-sm">{price.toFixed(2)} kr.</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <button
                        onClick={handleIconClick}
                        className="text-gray-600 hover:text-amber-500"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
