"use client";

import React, { useState } from "react";

function AppointmentConfirmation() {
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");

    return (
        <div className="w-full max-w-xl mx-auto p-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Contact info</h2>
                <button className="text-base font-medium text-gray-500 hover:text-gray-700">
                    Sign in
                </button>
            </div>

            {/* Phone Number */}
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
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
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
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <FloatingInput
                    id="lastName"
                    label="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            {/* Email */}
            <FloatingInput
                id="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Appointment Note */}
            <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-gray-900">Appointment note</h2>
                    <span className="text-sm text-gray-500">Optional</span>
                </div>
                <textarea
                    rows={4}
                    placeholder="Add any notes for your appointment..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-800 placeholder-gray-400 resize-none"
                />
            </div>
        </div>
    );
}

interface FloatingInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    id: string;
}

interface FloatingInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    id: string;
}

function FloatingInput({ label, value, onChange, type = "text", id }: FloatingInputProps) {
    const isFilled = value.length > 0;

    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
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



export default AppointmentConfirmation;
