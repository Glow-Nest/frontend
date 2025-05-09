import React from 'react';
import { ShoppingCart } from 'lucide-react';

function Cart() {
    return (
        <div className="bg-white h-full rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
            <div className="w-full flex items-center gap-1 border-b border-gray-200 pb-3 mb-4">
                <ShoppingCart className="w-6 h-6 text-amber-500" />
                <p className="text-xl font-semibold">Your Cart</p>
            </div>

            <p className="text-sm text-gray-500 text-center">
                You haven't added any items yet.
            </p>
        </div>
    );
}

export default Cart;
