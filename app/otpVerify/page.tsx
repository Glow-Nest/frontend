'use client';

import React from 'react';
import LoginSignUpNavbar from '@/components/common/SignUpLoginNavbar';

import "../../components/common/css/hoverUnderline.css"
import VerifyBox from '@/components/otpVerify/VerifyBox';

function OTPVerify() {
    return (
        <>
            <LoginSignUpNavbar />

            <VerifyBox/>
        </>
    );
}

export default OTPVerify;
