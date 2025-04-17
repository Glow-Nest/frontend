
import React from 'react'

import LoginSignUpNavbar from '@/components/common/LoginSignUpNavbar';
import SignUpBox from '@/components/signup/SignUpBox';

function SignUp() {
    return (
        <>
            <LoginSignUpNavbar type='signup'/>

            <SignUpBox/>
        </>

    )
}

export default SignUp