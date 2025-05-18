import React from 'react';
import { CalendarCheck2, CheckCircle2, Clock3, Truck } from 'lucide-react';
import OrderDescription from '@/components/owner/orders/OrderDescription';

function Orders() {
  return (
    <div className="grid grid-cols-8 grid-rows-5 gap-4 h-full p-3 bg-gray-100">
      {/* total orders */}
      <div className="col-span-2 bg-white rounded-xl p-5 shadow flex items-center gap-4">
        <div className="bg-blue-100 text-blue-500 p-3 rounded-xl">
          <CalendarCheck2 size={28} />
        </div>
        <div>
          <div className="text-2xl font-bold">17</div>
          <div className="text-gray-500">Total Orders</div>
        </div>
      </div>

      {/* completed orders */}
      <div className="col-span-2 col-start-3 bg-white rounded-xl p-5 shadow flex items-center gap-4">
        <div className="bg-red-100 text-red-500 p-3 rounded-xl">
          <CheckCircle2 size={28} />
        </div>
        <div>
          <div className="text-2xl font-bold">12</div>
          <div className="text-gray-500">Completed</div>
        </div>
      </div>

      {/* paid orders */}
      <div className="col-span-2 col-start-5 bg-white rounded-xl p-5 shadow flex items-center gap-4">
        <div className="bg-yellow-100 text-yellow-500 p-3 rounded-xl">
          <Clock3 size={28} />
        </div>
        <div>
          <div className="text-2xl font-bold">4</div>
          <div className="text-gray-500">Paid</div>
        </div>
      </div>

      {/* ready for pickup orders */}
      <div className="col-span-2 col-start-7 bg-white rounded-xl p-5 shadow flex items-center gap-4">
        <div className="bg-green-100 text-green-500 p-3 rounded-xl">
          <Truck size={28} />
        </div>
        <div>
          <div className="text-2xl font-bold">1</div>
          <div className="text-gray-500">Ready for Pickup</div>
        </div>
      </div>

      {/* order description */}
      <div className="col-span-8 row-span-4 row-start-2 rounded-md bg-white">
        <OrderDescription />
      </div>
    </div>
  );
}

export default Orders;
