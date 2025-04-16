'use client';

import React from 'react';
import BackIcon from '@/components/common/BackIcon';
import "../common/css/hoverUnderline.css";
import { useRouter } from 'next/navigation';
import '@fortawesome/fontawesome-svg-core/styles.css';

interface NavbarProps {
    type: 'login' | 'signup';
}

function LoginSignUpNavbar({ type }: NavbarProps) {
    const router = useRouter();

    const handleNavigate = () => {
        router.push(type === 'login' ? '/signup' : '/login');
    };

    return (
        <div className="p-5 m-4 flex justify-between items-center">
            <BackIcon />

            <span
                onClick={handleNavigate}
                className="hoverUnderline text-sm uppercase cursor-pointer relative inline-block"
            >
                {type === 'login' ? 'Create Account' : 'Login'}
            </span>
        </div>
    );
}

export default LoginSignUpNavbar;
