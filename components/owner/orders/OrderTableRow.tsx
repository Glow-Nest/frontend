import React from 'react';
import { OrderResponseDto } from 'libs/types/OrderTypes';
import { MoreHorizontal } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export function OrderTableRow({ order, onClick }: { order: OrderResponseDto; onClick: () => void }) {
    return (
        <tr className="hover:bg-gray-200 cursor-pointer" onClick={onClick}>
            <td className="py-3 px-4">{order.orderId}</td>
            <td className="py-3 px-4">{order.orderDate}</td>
            <td className="py-3 px-4">{order.pickupDate}</td>
            <td className="py-3 px-4">{order.customerName}</td>
            <td className="py-3 px-4">
                <StatusBadge status={order.status} />
            </td>
            <td className="py-3 px-4 font-medium">{order.totalPrice} kr.</td>
        </tr>
    );
}
