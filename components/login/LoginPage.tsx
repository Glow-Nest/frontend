'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InputFields from '../login/InputFields';
import ContinueWithButton from '../signup/ContinueWithButton';
import logo from 'public/logo.svg';

function LoginPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center min-h-screen px-4 w-full overflow-hidden">
            <div className="flex justify-center mb-4">
                <div className="relative w-[120px] sm:w-[150px] h-[120px] sm:h-[150px]"> 
                    <Image src={logo} alt="Logo" />
                </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6">
                Log into GlowNest
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-3xl gap-6 md:gap-12">
                <div className="w-full md:w-1/2">
                    <InputFields />
                </div>

                <div className="hidden md:flex flex-col items-center">
                    <div className="h-28 border-r border-gray-200"></div>
                    <span className="text-gray-500 text-sm my-3">OR</span>
                    <div className="h-28 border-r border-gray-200"></div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
                    <ContinueWithButton showEmailOption={false} onEmailClick={() => {}} />
                </div>
            </div>

            <span
                onClick={() => router.push('/signup')}
                className="hoverUnderline text-sm uppercase cursor-pointer relative mt-10 inline-block"
            >
                Can't log In?
            </span>
        </div>
    );
}

export default LoginPage;
