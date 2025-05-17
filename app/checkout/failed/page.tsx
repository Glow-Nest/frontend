
"use client"

import React from 'react';
import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

function CancelPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <XCircle className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Payment Canceled</h1>
      <p className="text-gray-600 mb-6">
        Your payment was not completed. You can try again or return to the homepage.
      </p>
      <button onClick={() => router.push("/")}
        className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition cursor-pointer"
      >
        Return to Home
      </button>
    </div>
  );
}

export default CancelPage;
