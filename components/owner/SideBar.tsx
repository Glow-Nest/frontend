"use client";

import { usePathname, useRouter } from "next/navigation";
import {
    Home,
    Calendar,
    Scissors,
    ShoppingBag,
    Settings,
    LogOut,
    Menu,
    X,
    ShoppingCart,
} from "lucide-react";
import { useState } from "react";

const navItems = [
    { label: "Dashboard", href: "/owner/dashboard", icon: Home },
    { label: "Schedule", href: "/owner/schedule", icon: Calendar },
    { label: "Services", href: "/owner/services", icon: Scissors },
    { label: "Products", href: "/owner/products", icon: ShoppingBag },
    { label: "Orders", href: "/owner/orders", icon: ShoppingCart},
    { label: "Settings", href: "/owner/settings", icon: Settings },
];

export default function SideBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navigate = (href: string) => {
        router.push(href);
        setMobileOpen(false);
    };

    return (
        <>
            {/* Hamburger toggle: only visible below md */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="text-white bg-neutral-900 p-2 rounded-md shadow-md"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen w-44 bg-neutral-900 text-white shadow-md transition-transform duration-300 
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static`}
            >
                {/* Logo */}
                <div className="flex items-center gap-2 px-4 py-4 border-b border-neutral-700">
                    <div className="bg-neutral-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs">
                        G
                    </div>
                    <span className="font-semibold text-lg hidden md:inline">GlowNest</span>
                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-2 mt-4 px-2 cursor-pointer">
                    {navItems.map(({ label, href, icon: Icon }) => {
                        const active = pathname.startsWith(href);
                        return (
                            <button
                                key={href}
                                onClick={() => navigate(href)}
                                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all w-full text-left ${active
                                    ? "bg-neutral-700 text-white"
                                    : "hover:bg-neutral-800 text-neutral-300 hover:text-white"
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="text-sm">{label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="px-4 py-4 border-t border-neutral-700 absolute bottom-0 w-full">
                    <button
                        onClick={() => console.log("Logging out...")}
                        className="flex items-center gap-3 px-4 py-2 rounded-md bg-neutral-700 text-white hover:bg-neutral-600 transition"
                    >
                        <LogOut size={20} />
                        <span className="text-sm">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
