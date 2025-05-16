"use client"

import React, { useState } from 'react';
import Navbar from '@/components/common/MainNavbar';
import ProgressIndicator from '@/components/checkout/progressIndicator';
import OrderSummary from '@/components/checkout/orderSummary';
import { Store } from 'lucide-react';


function CheckoutLayout({ children, step = 1, readonly }: { children: React.ReactNode, step?: number, readonly?: boolean }) {
    return (
        <div>
            <Navbar />

            <div className='min-h-screen pt-20'>
                {/* Pickup Message */}
                <div className="border-l-4 border-amber-500 flex bg-amber-50 p-5 rounded-md shadow-sm w-5xl mx-auto gap-3">
                    <Store className="w-6 h-6 text-amber-500 mt-1" />
                    <div>
                        <h3 className="text-base font-semibold text-amber-700">Pickup Only <span></span></h3>
                        <p className="text-sm text-amber-800">
                            Products must be picked up at the salon. Delivery is currently not available.
                        </p>
                    </div>
                </div>

                {/* progress indicator */}
                <div>
                    <ProgressIndicator step={step} />
                </div>

                <div className='flex'>
                    <div className="flex-2/3">
                        {children}
                    </div>

                    <div className='flex-1/3'>
                        <OrderSummary readOnly={readonly} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutLayout;
