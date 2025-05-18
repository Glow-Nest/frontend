import React from 'react';

const statusColors: Record<string, string> = {
    Created: 'bg-gray-100 text-gray-700',
    Paid: 'bg-green-100 text-green-700',
    ReadyForPickup: 'bg-yellow-100 text-yellow-700',
    Completed: 'bg-blue-100 text-blue-700',
    Cancelled: 'bg-red-100 text-red-800'
};

export function StatusBadge({ status }: { status: string }) {
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
            {status}
        </span>
    );
}
