import React from 'react'

import BackIcon from '@/components/common/BackIcon';
import "../common/css/hoverUnderline.css"

import '@fortawesome/fontawesome-svg-core/styles.css';

function LoginSignUpNavbar() {

    return (
        <>
            <div className="p-5 m-4 flex justify-between items-center">
                <BackIcon/>

                <div className="hoverUnderline text-sm uppercase cursor-pointer relative inline-block">
                    Log in
                </div>

            </div>
           
        </>

    )
}

export default LoginSignUpNavbar