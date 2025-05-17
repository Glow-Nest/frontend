"use client"

import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearOrder } from '@/store/slices/order/orderSlice';

function SuccessPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearOrder());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. A confirmation email has been sent to you.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition cursor-pointer"
      >
        Return to Home
      </button>
    </div>
  );
}

export default SuccessPage;
