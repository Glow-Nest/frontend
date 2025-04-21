"use client";

import React, { useEffect, useRef, useState } from 'react'

import "../../components/common/css/hoverUnderline.css";
import toast from 'react-hot-toast';
import { useVerifyOtpMutation, useSendOtpMutation } from '@/store/api/clientApi';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyBox() {
    const [secondsLeft, setSecondsLeft] = useState(2 * 60); // 5 minutes
    const [otp, setOtp] = useState(["", "", "", ""]);

    const [verifyOtp, { isLoading: isVerifying, isSuccess: otpVerfied, error: verifyOtpError }] = useVerifyOtpMutation();
    const [sendOtp, { isLoading: isSending, isSuccess: otpSent, error: sendOtpError }] = useSendOtpMutation();

    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const purpose = searchParams.get("purpose");

    const inputRefs = useRef<HTMLInputElement[]>([]);

    const router = useRouter();

    useEffect(() => {
        if (secondsLeft <= 0) {
            toast.error("Your OTP has timed out. Click 'Resend' to get a new code.");
            return;
        }

        const interval = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft]);

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyClick = async () => {
        const joinedOtp = otp.join("");
    
        if (joinedOtp.length !== 4) {
            toast.error("Please enter the complete 4-digit OTP.");
            return;
        }
    
        if (!email) {
            toast.error("Email is missing. Please return to sign-up.");
            return;
        }
    
        try {
            const result = await toast.promise(
                verifyOtp({ email: email, otpCode: joinedOtp }).unwrap(),
                {
                    loading: "Verifying OTP...",
                    success: "OTP verified successfully!",
                    error: (err: any) => err?.data?.[0]?.message || "Failed to verify OTP. Please try again.",
                }
            );

            if(purpose === "Registration") {
                    router.push("/login");
                    return;
                }
    
            router.push("/resetPassword?email=" + encodeURIComponent(email));
        } catch {
        }
    };
    

    const handleResendClick = async () => {
        if (!email) {
            toast.error("Email is missing. Please return to sign-up.");
            return;
        }

        setSecondsLeft(2*60);
    
        await toast.promise(
            sendOtp({ email, purpose: purpose || "Registration" }).unwrap(),
            {
                loading: "Resending OTP...",
                success: "OTP has been resent.",
                error: (err: any) => err?.data?.[0]?.message || "Failed to resend OTP.",
            }
        );
    };
    
    const handleCancelClick = () => {
        router.push("/signup");
    }

    return (
        <div className="bg-white shadow-md rounded-xl border border-neutral-200 
                w-[90vw] sm:w-[70vw] md:w-[30vw] 
                p-6 sm:p-8 flex flex-col gap-5 items-center text-center m-auto">

            <h2 className="text-xl font-bold text-neutral-900">OTP verification</h2>

            <p className="text-sm text-neutral-600">
                Please enter the OTP (One-Time Password) sent to your registered email/phone number to complete your verification.
            </p>

            {/* OTP Boxes */}
            <div className="flex gap-4 justify-center mt-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 border border-neutral-300 rounded-lg text-center text-lg font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => {
                            inputRefs.current[index] = el!;
                        }} />
                ))}
            </div>

            {/* Timer & Resend */}
            <div className="text-sm text-neutral-600 flex justify-between w-full px-2">
                <span>
                    Remaining time: <span className="text-neutral-600 font-medium">{formatTime(secondsLeft)}</span>
                </span>
                <span>
                    Didn't get the code? <button className="text-neutral-600 font-medium hoverUnderline cursor-pointer relative inline-block" onClick={handleResendClick} >Resend</button>
                </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 w-full mt-2">
                <button className="font-medium py-2 rounded-full bg-black text-white hover:bg-gray-700 transition" onClick={handleVerifyClick}>
                    Verify
                </button>
                <button className="border border-neutral-600 text-neutral-600 font-medium py-2 rounded-full hover:bg-violet-50 transition" onClick={handleCancelClick}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default VerifyBox