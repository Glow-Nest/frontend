"use client"

import React, { useEffect, useState } from 'react';
import { BadgeCheck, Calendar, CalendarDays, DollarSign, MoreHorizontal, User, X } from 'lucide-react';
import { OrderResponseDto } from 'libs/types/OrderTypes';
import { useGetAllOrdersQuery } from '@/store/api/orderApi';
import toast from 'react-hot-toast';
import { extractFirstErrorMessage } from 'libs/helpers';

const statusTabs = ['All', 'Created', 'Paid', 'ReadyForPickup', 'Completed'] as const;

const statusColors: Record<string, string> = {
    Created: 'bg-gray-100 text-gray-700',
    Paid: 'bg-green-100 text-green-700',
    ReadyForPickup: 'bg-yellow-100 text-yellow-700',
    Completed: 'bg-blue-100 text-blue-700',
};

function OrderDescription() {
    const [activeTab, setActiveTab] = useState<string>("All");
    const [selectedOrder, setSelectedOrder] = useState<OrderResponseDto | null>(null);

    const { data: fetchedOrders = [], isLoading, isError } = useGetAllOrdersQuery({ status: activeTab !== "All" ? activeTab : "All" });

    useEffect(() => {
        if (isLoading) {
            toast.loading("Fetching orders...", { id: "fetchOrders" });
        } else {
            toast.dismiss("fetchOrders");
        }

        if (isError) {
            var errorMessage = extractFirstErrorMessage(fetchedOrders);
            toast.error(errorMessage);
        }
    }, [isLoading, isError]);



    const filteredOrders = activeTab === "All"
        ? fetchedOrders
        : fetchedOrders.filter((order) => order.status === activeTab);

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full">

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-6 px-4 pt-6 sm:px-6">
                {statusTabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all 
          ${activeTab === tab
                                ? "bg-amber-400 text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* States */}
            {isLoading && <p className="px-6 pb-4 text-sm text-gray-500">Loading orders...</p>}
            {isError && <p className="px-6 pb-4 text-sm text-red-500">Failed to fetch orders.</p>}

            {/* Mobile Cards */}
            <div className="flex flex-col sm:hidden gap-4 px-4 pb-6">
                {filteredOrders.map((order) => (
                    <div
                        key={order.orderId}
                        onClick={() => setSelectedOrder(order)}
                        className="border rounded-xl p-4 shadow-sm cursor-pointer transition-all"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold">#{order.orderId}</span>
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                            <Calendar size={14} /> {order.orderDate}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                            <Calendar size={14} /> Pickup: {order.pickupDate}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                            <User size={14} /> {order.customerName}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                            <DollarSign size={14} /> {order.totalPrice}
                        </div>
                        <div className="text-sm flex items-center gap-2">
                            <BadgeCheck size={14} />
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                ))}


            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto px-6 pb-6">
                <table className="min-w-full text-sm">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            <th className="text-left font-medium py-3 px-4">Order Number</th>
                            <th className="text-left font-medium py-3 px-4">Order Date</th>
                            <th className="text-left font-medium py-3 px-4">Pickup Date</th>
                            <th className="text-left font-medium py-3 px-4">Customer</th>
                            <th className="text-left font-medium py-3 px-4">Status</th>
                            <th className="text-left font-medium py-3 px-4">Cost</th>
                            <th className="text-left font-medium py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredOrders.map((order) => (
                            <tr key={order.orderId} className="hover:bg-gray-200 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                                <td className="py-3 px-4">{order.orderId}</td>
                                <td className="py-3 px-4">{order.orderDate}</td>
                                <td className="py-3 px-4">{order.pickupDate}</td>
                                <td className="py-3 px-4">{order.customerName}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 font-medium">{order.totalPrice}</td>
                                <td className="py-3 px-4">
                                    <button className="p-2 hover:bg-gray-200 rounded-full transition">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    <div className="relative w-full max-w-md rounded-2xl p-6 border bg-white shadow-xl text-black">

                        {/* Close button */}
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-3 right-3 text-black cursor-pointer hover:text-red-900"
                        >
                            <X size={20} />
                        </button>

                        {/* Title */}
                        <h2 className="text-lg font-semibold mb-4">
                            Order <span className="text-amber-400 font-bold">#{selectedOrder.orderId}</span>
                        </h2>

                        {/* Info */}
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <CalendarDays size={16} className="text-blue-900" />
                                <span><span className="text-black">Date:</span> {selectedOrder.orderDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays size={16} className="text-purple-900" />
                                <span><span className="text-black">Pickup:</span> {selectedOrder.pickupDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-teal-900" />
                                <span><span className="text-black">Customer:</span> {selectedOrder.customerName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BadgeCheck size={16} className="text-green-900" />
                                <span><span className="text-black">Status:</span> {selectedOrder.status}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign size={16} className="text-yellow-900" />
                                <span><span className="text-black">Total:</span> {selectedOrder.totalPrice} DKK</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="my-4 border-white/30" />

                        {/* Items */}
                        <div>
                            <h3 className="text-sm font-semibold mb-2">Items</h3>
                            <ul className="space-y-1 text-sm">
                                {selectedOrder.orderItems.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{item.productName}</span>
                                        <span>{item.quantity} × {item.priceWhenOrdering} DKK</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
}

export default OrderDescription;
