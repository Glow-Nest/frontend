"use client";

import React, { useEffect } from "react";

import "../common/css/hoverUnderline.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { setAppointmentNote } from "@/store/slices/schedules/CreateAppointmentSlice";
import toast from "react-hot-toast";

function AppointmentConfirmation() {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);

    const note = useSelector((state: RootState) => state.appointment.appointmentNote);
    const phone = user.phoneNumber || "";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const email = user.email || "";

    useEffect(() => {
        if (!user.email) {
            toast("You need to sign in to complete your appointment", {
                icon: "🔒",
            });
        }
    }, [user.email]);


    const handleSignInClick = () => {
        router.push("/login");
    }


    return (
        <div className="w-full max-w-xl mx-auto p-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Contact info</h2>
                {!user.email && <button className="hoverUnderline text-sm uppercase cursor-pointer relative inline-block" onClick={handleSignInClick}>
                    Sign in
                </button>}
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

            {/* Appointment Note */}
            <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-gray-900">Appointment note</h2>
                </div>
                <textarea
                    rows={4}
                    placeholder="Add any notes for your appointment..."
                    value={note || ""}
                    onChange={(e) => dispatch(setAppointmentNote(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-800 placeholder-gray-400 resize-none"
                />
            </div>
        </div>
    );
}

interface FloatingInputProps {
    label: string;
    value: string;
    type?: string;
    id: string;
}

function FloatingInput({ label, value, type = "text", id }: FloatingInputProps) {
    const isFilled = value.length > 0;

    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                value={value}
                readOnly
                className={`peer w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 text-base text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200`}
                placeholder={label}
            />
            <label
                htmlFor={id}
                className={`absolute left-4 transition-all text-sm pb-1 ${isFilled
                    ? "top-2 text-[#dba052] font-semibold"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400"
                    } peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#dba052] peer-focus:font-semibold`}
            >
                {label}
            </label>
        </div>
    );
}



export { FloatingInput };
export default AppointmentConfirmation;
