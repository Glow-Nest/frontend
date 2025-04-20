"use client";

import Image from "next/image";

import unauthorized from "../../public/unauthorized.png";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
    const router = useRouter();

    const goBackToHome = () => {
        router.push("/");
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#fff9eb] text-center px-4">
            <Image
                src={unauthorized}
                alt="Unauthorized Access"
                width={300}
                height={300}
                priority
            />
            <h1 className="text-4xl font-bold text-[#dba052] mt-6">Access Denied</h1>
            <p className="text-gray-600 mt-2">Only salon owners can access this section.</p>
            {/* <Link
                href="/"
                className="mt-6 inline-block bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition"
            >
                Return Home
            </Link> */}

            <button
                onClick={goBackToHome}
                className="bg-[#c48a25] hover:bg-[#a7701e] cursor-pointer text-white py-2 px-6 rounded transition font-medium mt-4"
            >
                Return Home
            </button>
        </div>
    );
}
