"use client";

import React from 'react';
import Navbar from '@/components/common/MainNavbar';
import ProgressIndicator from '@/components/checkout/progressIndicator';
import OrderSummary from '@/components/checkout/orderSummary';
import { Store } from 'lucide-react';

function CheckoutLayout({ children, step = 1, readonly }: { children: React.ReactNode, step?: number, readonly?: boolean }) {
    return (
        <div>
            <Navbar />

            <div className="min-h-screen pt-20">
                {/* Pickup Message */}
                <div className="border-l-4 border-amber-500 flex bg-amber-50 p-5 rounded-md shadow-sm max-w-5xl mx-auto gap-3">
                    <Store className="w-6 h-6 text-amber-500 mt-1 shrink-0" />
                    <div>
                        <h3 className="text-base font-semibold text-amber-700">Pickup Only</h3>
                        <p className="text-sm text-amber-800">
                            Products must be picked up at the salon. Delivery is currently not available.
                        </p>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="max-w-5xl mx-auto mt-6">
                    <ProgressIndicator step={step} />
                </div>

                {/* Content Layout */}
                <div className="flex flex-col lg:flex-row max-w-5xl mx-auto gap-6 mt-6 px-4">
                    <div className="w-full lg:w-3/5">
                        {children}
                    </div>

                    <div className="w-full lg:w-2/5">
                        <OrderSummary readOnly={readonly} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutLayout;
