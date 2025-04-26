
import React, { Suspense } from 'react';
import LoginSignUpNavbar from '@/components/common/LoginSignUpNavbar';

import "../../components/common/css/hoverUnderline.css"
import ResetPasswordBox from '@/components/resetPassword/ResetPasswordBox';

function resetPassword() {
    return (
        <>
            <LoginSignUpNavbar type={'login'}/>

            <Suspense fallback={<div>Resetting password...</div>}>
                <ResetPasswordBox />
            </Suspense>
        </>
    );
}

export default resetPassword;
