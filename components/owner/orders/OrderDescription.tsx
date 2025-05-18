"use client";

import React, { useEffect, useMemo, useState } from 'react';
import {
    BadgeCheck,
    Calendar,
    CalendarDays,
    DollarSign,
    MoreHorizontal,
    User,
    X,
} from 'lucide-react';
import { OrderResponseDto } from 'libs/types/OrderTypes';
import { useGetAllOrdersQuery } from '@/store/api/orderApi';
import toast from 'react-hot-toast';
import { extractFirstErrorMessage } from 'libs/helpers';
import { OrderTableRow } from './OrderTableRow';
import { OrderDetailsModal } from './OrderDetailsModel';
import { OrderCard } from './OrderCard';

const statusTabs = ['All', 'Created', 'Paid', 'ReadyForPickup', 'Completed'] as const;

const statusColors: Record<string, string> = {
    Created: 'bg-gray-100 text-gray-700',
    Paid: 'bg-green-100 text-green-700',
    ReadyForPickup: 'bg-yellow-100 text-yellow-700',
    Completed: 'bg-blue-100 text-blue-700',
};

function OrderDescription() {
    const [activeTab, setActiveTab] = useState<string>('All');
    const [selectedOrder, setSelectedOrder] = useState<OrderResponseDto | null>(null);
    const { data: fetchedOrders = [], isLoading, isError } = useGetAllOrdersQuery({
        status: activeTab !== 'All' ? activeTab : 'All',
    });

    useEffect(() => {
        if (isLoading) toast.loading('Fetching orders...', { id: 'fetchOrders' });
        else toast.dismiss('fetchOrders');

        if (isError) toast.error(extractFirstErrorMessage(fetchedOrders));
    }, [isLoading, isError]);

    const filteredOrders = useMemo(() => {
        return activeTab === 'All' ? fetchedOrders : fetchedOrders.filter(o => o.status === activeTab);
    }, [fetchedOrders, activeTab]);

    return (
        <div className="bg-white rounded-2xl shadow-md flex flex-col h-full overflow-hidden">
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-6 px-4 pt-6 sm:px-6">
                {statusTabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${activeTab === tab ? 'bg-amber-400 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Loading / Error */}
            {isLoading && <p className="px-6 pb-4 text-sm text-gray-500">Loading orders...</p>}
            {isError && <p className="px-6 pb-4 text-sm text-red-500">Failed to fetch orders.</p>}

            {/* Mobile View */}
            <div className="flex flex-col sm:hidden gap-4 px-4 pb-6">
                {filteredOrders.map(order => (
                    <OrderCard key={order.orderId} order={order} onClick={() => setSelectedOrder(order)} />
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block overflow-x-auto px-6 pb-6">
                <table className="min-w-full text-sm">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            {['Order Number', 'Order Date', 'Pickup Date', 'Customer', 'Status', 'Cost', 'Action'].map(header => (
                                <th key={header} className="text-left font-medium py-3 px-4">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredOrders.map(order => (
                            <OrderTableRow key={order.orderId} order={order} onClick={() => setSelectedOrder(order)} />
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
        </div>
    );
}

export default OrderDescription;
