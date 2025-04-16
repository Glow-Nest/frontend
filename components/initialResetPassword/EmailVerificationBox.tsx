"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useInitiatePasswordResetMutation } from "@/store/api/clientApi";
import { useRouter } from "next/navigation";

function EmailVerificationBox() {
    const [email, setEmail] = useState("");
    const [initiateReset, { isLoading }] = useInitiatePasswordResetMutation();
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            await toast.promise(
                initiateReset({ email }).unwrap(),
                {
                    loading: "Sending OTP...",
                    success: "OTP sent successfully!",
                    error: (err: any) =>
                        err?.data?.[0]?.message || "Failed to send OTP.",
                }
            );

            // Redirect to OTP page
            router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
        } catch {
            // No-op since toast handles it
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl border border-neutral-200 
                w-[90vw] sm:w-[70vw] md:w-[30vw] 
                p-6 sm:p-8 flex flex-col gap-5 items-center text-center m-auto mt-10">

            <h2 className="text-xl font-bold text-neutral-900">Forgot Password?</h2>

            <p className="text-sm text-neutral-600">
                Enter your registered email address. We'll send you an OTP to reset your password.
            </p>

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500"
            />

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full font-medium py-2 rounded-full bg-black text-white hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Sending..." : "Verify OTP"}
            </button>
        </div>
    );
}

export default EmailVerificationBox;
