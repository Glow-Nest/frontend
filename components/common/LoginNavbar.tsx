import React from 'react'

import BackIcon from '@/components/common/BackIcon';
import "../common/css/hoverUnderline.css"
import Link from 'next/link';

import '@fortawesome/fontawesome-svg-core/styles.css';

function LoginNavbar() {

    return (
        <>
            <div className="p-5 m-4 flex justify-between items-center">
                <BackIcon/>

                <Link href="/signup" className="hoverUnderline text-sm uppercase cursor-pointer relative inline-block">
                    Create Account
                </Link>

            </div>
           
        </>

    )
}

export default LoginNavbar