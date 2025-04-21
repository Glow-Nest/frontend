"use client";

import AppointmentSummary from '@/components/appointments/AppointmentSummary';
import Navbar from '@/components/common/MainNavbar';
import React, { useEffect } from 'react';

import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function StepLayout({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        const reason = Cookies.get("redirectReason");

        if (reason === 'missing-services') {
            toast.error('Please select a service before continuing.');
            Cookies.set("redirectReason", "", { expires: new Date(0)});
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="mt-20 px-4 max-w-screen-xl mx-auto flex flex-col md:flex-row gap-20 justify-center">
                {/* Left: dynamic step view */}
                <div className="w-full md:w-[55%]">{children}</div>

                {/* Right: summary (persistent) */}
                <div className="w-full md:w-[35%]">
                    <AppointmentSummary />
                </div>
            </div>
        </>
    );
}
