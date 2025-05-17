"use client";

import { RootState } from '@/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FloatingInput } from '../appointments/AppointmentConfirmation';
import { useRouter } from 'next/navigation';

function UserDetails() {
    const router = useRouter();

    const user = useSelector((state: RootState) => state.user);

    const phone = user.phoneNumber || "";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const email = user.email || "";

    const handleSignInClick = () => {
        router.push("/login");
    }

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-8 mb-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Billing Information</h2>

                {!user.email && <p className="hoverUnderline text-sm font-medium text-amber-500 uppercase cursor-pointer relative inline-block" onClick={handleSignInClick}>
                    Click here to login to proceed
                </p>}
            </div>

            {/* Phone Number with floating label */}
            <div className="relative w-full">
                {/* Fixed prefix element */}
                <div className="absolute left-4 top-5 text-base font-semibold text-gray-800 flex items-center gap-1 z-10">
                    🇩🇰 +45
                </div>

                {/* Actual phone input */}
                <input
                    id="phone"
                    type="tel"
                    value={phone}
                    placeholder="Phone number"
                    readOnly
                    className={`peer pl-20 pr-4 pt-6 pb-2 w-full border border-gray-300 rounded-lg text-base text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200`}
                />

                {/* Floating label */}
                <label
                    htmlFor="phone"
                    className={`absolute left-20 transition-all text-sm pb-1 ${phone.length > 0
                        ? "top-2 text-[#dba052] font-semibold"
                        : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400"
                        } peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#dba052] peer-focus:font-semibold`}
                >
                    Phone number
                </label>
            </div>


            {/* Name Fields */}
            <div className="flex gap-4">
                <FloatingInput
                    id="firstName"
                    label="First name"
                    value={firstName}

                />
                <FloatingInput
                    id="lastName"
                    label="Last name"
                    value={lastName}
                />
            </div>

            {/* Email */}
            <FloatingInput
                id="email"
                type="email"
                label="Email"
                value={email}
            />
        </div>
    )
}

export default UserDetails