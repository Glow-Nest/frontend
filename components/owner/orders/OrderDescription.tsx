"use client";

import React, { useEffect, useState } from 'react';
import { OrderResponseDto } from 'libs/types/OrderTypes';
import { useGetAllOrdersQuery } from '@/store/api/orderApi';
import toast from 'react-hot-toast';
import { extractFirstErrorMessage } from 'libs/helpers';
import { OrderTableRow } from './OrderTableRow';
import { OrderDetailsModal } from './OrderDetailsModel';
import { OrderCard } from './OrderCard';

const statusTabs = ['All', 'Created', 'Paid', 'ReadyForPickup', 'Completed'] as const;

function OrderDescription() {
    const itemsPerPage = 6;

    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState<string>('All');
    const [selectedOrder, setSelectedOrder] = useState<OrderResponseDto | null>(null);
    const { data, isLoading, isError } = useGetAllOrdersQuery({
        status: activeTab !== 'All' ? activeTab : '',
        page: currentPage,
        pageSize: itemsPerPage,
    });

    const orders = data?.orders ?? [];
    const totalPages = Math.ceil((data?.totalCount ?? 0) / itemsPerPage);

    useEffect(() => {
        console.log('orders', data?.orders);
        console.log('totalCount', data?.totalCount);
    }, [data]);


    useEffect(() => {
        if (isLoading) toast.loading('Fetching orders...', { id: 'fetchOrders' });
        else toast.dismiss('fetchOrders');

        if (isError) toast.error(extractFirstErrorMessage(orders));

    }, [isLoading, isError]);

    return (
        <div>
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-6 px-4 pt-6 sm:px-6 justify-between">
                <div className='flex gap-3'>
                    {statusTabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => {
                                setCurrentPage(1);
                                setActiveTab(tab);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${activeTab === tab ? 'bg-amber-400 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}

                </div>
                {/* Pagination Bar */}
                {totalPages > 1 && <div className="flex justify-center flex-wrap items-center gap-1 mt-2">
                    {/* Previous */}
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-2 py-1 rounded disabled:opacity-50 hover:bg-gray-200"
                    >
                        &lt;
                    </button>

                    {/* First pages */}
                    {currentPage > 2 && (
                        <>
                            <PageButton page={1} currentPage={currentPage} onPageChange={setCurrentPage} />
                            {currentPage > 3 && <span className="px-1">…</span>}
                        </>
                    )}

                    {/* Surrounding current */}
                    {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                        .filter(p => p > 0 && p <= totalPages)
                        .map(p => (
                            <PageButton key={p} page={p} currentPage={currentPage} onPageChange={setCurrentPage} />
                        ))}

                    {/* Last page */}
                    {currentPage < totalPages - 1 && (
                        <>
                            {currentPage < totalPages - 2 && <span className="px-1">…</span>}
                            <PageButton page={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
                        </>
                    )}

                    {/* Next */}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 rounded disabled:opacity-50 hover:bg-gray-200"
                    >
                        &gt;
                    </button>
                </div>}

            </div>

            {/* Loading / Error */}
            {isLoading && <p className="px-6 pb-4 text-sm text-gray-500">Loading orders...</p>}
            {isError && <p className="px-6 pb-4 text-sm text-red-500">Failed to fetch orders.</p>}

            {/* Mobile View */}
            <div className="flex flex-col sm:hidden gap-4 px-4 pb-6">
                {orders.map(order => (
                    <OrderCard key={order.orderId} order={order} onClick={() => setSelectedOrder(order)} />
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block overflow-x-auto px-6 pb-6">
                <table className="min-w-full text-sm">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            {['Order Number', 'Order Date', 'Pickup Date', 'Customer', 'Status', 'Total Price', 'Action'].map(header => (
                                <th key={header} className="text-left font-medium py-3 px-4">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map(order => (
                            <OrderTableRow key={order.orderId} order={order} onClick={() => setSelectedOrder(order)} />
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
        </div>
    );
}

function PageButton({
    page,
    currentPage,
    onPageChange,
}: {
    page: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}) {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-md text-sm font-medium flex items-center justify-center transition-all
        ${isActive ? 'bg-amber-400 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
      `}
        >
            {page}
        </button>
    );
}


export default OrderDescription;
