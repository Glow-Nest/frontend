
import React, { Suspense } from 'react';
import LoginSignUpNavbar from '@/components/common/LoginSignUpNavbar';

import "../../components/common/css/hoverUnderline.css"
import EmailVerificationBox from '@/components/initialResetPassword/EmailVerificationBox';

function initialResetPassword() {
    return (
        <>
            <LoginSignUpNavbar type={'login'}/>

            <Suspense fallback={<div>Loading OTP screen...</div>}>
                <EmailVerificationBox />
            </Suspense>
        </>
    );
}

export default initialResetPassword;
