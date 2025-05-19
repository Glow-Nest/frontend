import React from 'react';
import { Calendar, DollarSign, User, BadgeCheck, MoreHorizontal } from 'lucide-react';
import { OrderResponseDto } from 'libs/types/OrderTypes';
import { StatusBadge } from './StatusBadge';

export function OrderCard({ order, onClick }: { order: OrderResponseDto; onClick: () => void }) {
  return (
    <div onClick={onClick} className="border rounded-xl p-4 shadow-sm cursor-pointer transition-all">
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
        <StatusBadge status={order.status} />
      </div>
    </div>
  );
}
