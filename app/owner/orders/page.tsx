import React from 'react';
import { CalendarCheck2, CheckCircle2, Clock3, Truck } from 'lucide-react';
import OrderDescription from '@/components/owner/orders/OrderDescription';

function Orders() {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-100 gap-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          icon={<CalendarCheck2 size={28} />}
          iconColor="text-blue-500"
          bgColor="bg-blue-100"
          label="Total Orders"
          value="17"
        />
        
        <SummaryCard
          icon={<CheckCircle2 size={28} />}
          iconColor="text-red-500"
          bgColor="bg-red-100"
          label="Completed"
          value="12"
        />

        <SummaryCard
          icon={<Clock3 size={28} />}
          iconColor="text-yellow-500"
          bgColor="bg-yellow-100"
          label="Paid"
          value="4"
        />

        <SummaryCard
          icon={<Truck size={28} />}
          iconColor="text-green-500"
          bgColor="bg-green-100"
          label="Ready for Pickup"
          value="1"
        />
      </div>

      {/* Order Details Section */}
      <div className="flex-1 rounded-xl bg-white shadow p-2 overflow-auto">
        <OrderDescription />
      </div>
    </div>
  );
}

function SummaryCard({ icon, iconColor, bgColor, label, value }: {
  icon: React.ReactNode;
  iconColor: string;
  bgColor: string;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow flex items-center gap-4">
      <div className={`${bgColor} ${iconColor} p-3 rounded-xl`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-500">{label}</div>
      </div>
    </div>
  );
}

export default Orders;
