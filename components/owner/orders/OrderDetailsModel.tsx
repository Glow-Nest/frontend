import React from 'react';
import { X, CalendarDays, User, BadgeCheck, DollarSign } from 'lucide-react';
import { OrderResponseDto } from 'libs/types/OrderTypes';

export function OrderDetailsModal({
    order,
    onClose,
}: {
    order: OrderResponseDto;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-md rounded-2xl p-6 border bg-white shadow-xl text-black">
                <button onClick={onClose} className="absolute top-3 right-3 text-black hover:text-red-900">
                    <X size={20} />
                </button>

                <h2 className="text-lg font-semibold mb-4">
                    Order <span className="text-amber-400 font-bold">#{order.orderId}</span>
                </h2>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-blue-900" />
                        <span><span className="text-black">Date:</span> {order.orderDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-purple-900" />
                        <span><span className="text-black">Pickup:</span> {order.pickupDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User size={16} className="text-teal-900" />
                        <span><span className="text-black">Customer:</span> {order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BadgeCheck size={16} className="text-green-900" />
                        <span><span className="text-black">Status:</span> {order.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-yellow-900" />
                        <span><span className="text-black">Total:</span> {order.totalPrice} DKK</span>
                    </div>
                </div>

                <hr className="my-4 border-white/30" />

                <div>
                    <h3 className="text-sm font-semibold mb-2">Items</h3>
                    <ul className="space-y-1 text-sm">
                        {order.orderItems.map((item, index) => (
                            <li key={index} className="flex justify-between">
                                <span>{item.productName}</span>
                                <span>{item.quantity} × {item.priceWhenOrdering} DKK</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
