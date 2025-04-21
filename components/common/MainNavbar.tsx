"use client";


import Image from "next/image";
import React, { useEffect, useState } from "react";

import logo from "../../public/g8640.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBars, faCartShopping, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

import "../common/css/hoverUnderline.css";
import "../common/css/buttonSweep.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { logout } from "@/store/slices/AuthSlice";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const user = useSelector((state: RootState) => state.auth.firstName);

    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        router.push("/login");
    };

    // Scroll Shrink Effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".user-dropdown-container")) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-1 shadow-sm bg-white" : "py-3 bg-white"
                } flex justify-between items-center px-8`}
        >
            {/* Left */}
            <div className="hidden lg:flex w-full justify-center gap-14 items-center text-[15px]">
                <div onClick={() => router.push("/")} className="hoverUnderline cursor-pointer relative inline-block">HOME</div>
                <div className="hoverUnderline cursor-pointer relative inline-block">SERVICES</div>
                <div className="hoverUnderline cursor-pointer relative inline-block">PRODUCTS</div>
            </div>

            {/* Logo */}
            <div className="relative w-[150px] h-[36px] flex-shrink-0 transition-all duration-300">
                <Image
                    src={logo}
                    alt="GlowNest Logo"
                    fill
                    priority
                    className="object-contain"
                />
            </div>

            {/* Right */}
            <div className="hidden lg:flex w-full justify-end gap-8 items-center text-[15px]">
                <button onClick={() =>  router.push("/appointments")} className="btn-sweep border cursor-pointer flex items-center justify-center gap-2 px-4 h-[38px] min-w-[170px] whitespace-nowrap leading-none text-sm" >
                    BOOK APPOINTMENT
                    <FontAwesomeIcon icon={faArrowRight} className="w-[14px] h-[14px]" />
                </button>
                <div className="relative user-dropdown-container">
                    <div className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setShowDropdown(!showDropdown)}>
                    <FontAwesomeIcon icon={faUser} className="w-[14px] h-[14px]" />
                        {user && <span className="font-semibold">HI, {user}</span>}
                    </div>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50 text-sm border border-gray-200">
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Manage Account</div>
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</div>
                    </div>
        )}
            </div>

            </div>


            {/* Hamburger */}
            <div className="lg:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon
                        icon={isOpen ? faXmark : faBars}
                        className="w-[20px] h-[20px]"
                    />
                </button>
            </div>

            {/* Mobile Drawer */}
            <div
                className={`absolute left-0 w-full bg-white shadow-lg transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-[100%] top-0" : "translate-y-[-150%] top-0"
                    } flex flex-col gap-6 p-5 z-40 text-lg`}
            >
                <div onClick={() => setIsOpen(false)} className="hoverUnderline cursor-pointer">HOME</div>
                <div onClick={() => setIsOpen(false)} className="hoverUnderline cursor-pointer">SERVICES</div>
                <div onClick={() => setIsOpen(false)} className="hoverUnderline cursor-pointer">PRODUCTS</div>
                <div onClick={() => setIsOpen(false)} className="hoverUnderline cursor-pointer">BOOK APPOINTMENT</div>
                <div className="flex gap-5 mt-2">
                    <FontAwesomeIcon icon={faUser} className="w-[16px] h-[16px]" />
                    <FontAwesomeIcon icon={faCartShopping} className="w-[16px] h-[16px]" />
                </div>
            </div>
        </nav>
    );
}
