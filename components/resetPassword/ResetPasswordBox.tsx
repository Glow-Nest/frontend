"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "@/store/api/clientApi";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordBox() {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    if (!email || !otpCode || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await toast.promise(
        resetPassword({
          email,
          otpCode,
          newPassword,
          confirmPassword,
        }).unwrap(),
        {
          loading: "Resetting password...",
          success: "Password has been reset!",
          error: (err: any) =>
            err?.data?.[0]?.message || "Failed to reset password.",
        }
      );

      router.push("/login"); 
    } catch {
      
    }
  };

  return (
    <div
      className="bg-white shadow-md rounded-xl border border-neutral-200 
        w-[90vw] sm:w-[70vw] md:w-[30vw] 
        p-6 sm:p-8 flex flex-col gap-5 items-center text-center m-auto mt-10"
    >
      <h2 className="text-xl font-bold text-neutral-900">Reset Password</h2>

      <p className="text-sm text-neutral-600">
        Please enter your new password and confirmation password.
      </p>

      <input
        type="password" 
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full px-4 py-2 border border-neutral-300 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-2 border border-neutral-300 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500"
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full font-medium py-2 rounded-full bg-black text-white hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}

export default ResetPasswordBox;
