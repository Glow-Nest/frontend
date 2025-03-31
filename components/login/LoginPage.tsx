'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import InputFields from '../login/InputFields';
import ContinueWithButton from '../common/ContinueWithButton';

function LoginPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
            {/* 🔹 Header */}
            <h2 className="text-2xl font-bold mb-6">Log In with GlowNest</h2>

            {/* 🔹 Main Login Section */}
            <div className="flex items-center justify-center w-full max-w-2xl">
                {/* 🟢 Left Side: Input Fields */}
                <div className="w-1/2 pr-6">
                    <InputFields />
                </div>

                {/* 🟡 Middle Divider */}
                <div className="flex flex-col items-center w-10">
                    <div className="h-24 border-r border-gray-400"></div>
                    <span className="text-gray-500 text-sm my-2">OR</span>
                    <div className="h-24 border-r border-gray-400"></div>
                </div>

                {/* 🔵 Right Side: Continue With Box */}
                <div className=" pl-6 flex flex-col items-center space-y-4">
                    <ContinueWithButton showEmailOption={false} onEmailClick={() => {}} />
                </div>
            </div>

            {/* 🔹 "Can't log in?" Text */}
            <p className="mt-4 text-sm text-gray-500 cursor-pointer hover:underline">
                Can't log in?
            </p>
        </div>
    );
}

export default LoginPage;
