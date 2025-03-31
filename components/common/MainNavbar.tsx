"use client";

import Image from 'next/image';
import React, { useState } from 'react';

import logo from "../../public/g8640.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars, faCartShopping, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

import "../common/css/hoverUnderline.css";
import "../common/css/buttonSweep.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md z-90 ">
            {/* Left nav items (hidden on mobile) */}
            <div className="hidden lg:flex w-full justify-center gap-16 items-center text-lg">
                <div className="hoverUnderline cursor-pointer relative inline-block y">HOME</div>
                <div className="hoverUnderline cursor-pointer relative inline-block">SERVICES</div>
                <div className="hoverUnderline cursor-pointer relative inline-block">PRODUCTS</div>
            </div>

            {/* Logo */}
            <div>
                <Image src={logo} alt="Logo" width={200} height={200} />
            </div>

            {/* Right nav */}
            <div className="hidden lg:flex w-full justify-end gap-10 items-center text-lg">
                <button className="btn-sweep border p-2 cursor-pointer flex items-center gap-2">BOOK APPOINTMENT <FontAwesomeIcon icon={faArrowRight} /></button>
                <div className="flex gap-5">
                    <FontAwesomeIcon icon={faUser} />
                    <FontAwesomeIcon icon={faCartShopping} />
                </div>
            </div>

            {/* Hamburger Button (only visible on mobile) */}
            <div className="lg:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={isOpen ? faXmark : faBars} size="lg" />
                </button>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="absolute top-20 left-0 w-full bg-white shadow-lg flex flex-col gap-6 p-5 z-50 text-lg">
                    <div className="hoverUnderline cursor-pointer">HOME</div>
                    <div className="hoverUnderline cursor-pointer">SERVICES</div>
                    <div className="hoverUnderline cursor-pointer">PRODUCTS</div>
                    <div className="hoverUnderline cursor-pointer">BOOK APPOINTMENT</div>
                    <div className="flex gap-5 mt-2">
                        <FontAwesomeIcon icon={faUser} />
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
