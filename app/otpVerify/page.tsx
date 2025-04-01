
import React, { Suspense } from 'react';
import LoginSignUpNavbar from '@/components/common/LoginSignUpNavbar';

import "../../components/common/css/hoverUnderline.css"
import VerifyBox from '@/components/otpVerify/VerifyBox';

function OTPVerify() {
    return (
        <>
            <LoginSignUpNavbar />

            <Suspense fallback={<div>Loading OTP screen...</div>}>
                <VerifyBox />
            </Suspense>
        </>
    );
}

export default OTPVerify;
