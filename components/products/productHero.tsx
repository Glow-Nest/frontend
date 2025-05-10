"use client";

import Image from "next/image";
import React from "react";
import ImageCard from "../landingPage/ImageCard";
import TextBox from "../landingPage/Textbox";

import image1 from "../../public/productPage/image1.jpg";
import image2 from "../../public/productPage/image2.jpg";
import image3 from "../../public/productPage/image3.jpg";
import image4 from "../../public/productPage/image4.jpg";
import image5 from "../../public/productPage/image5.jpg";

export default function ProductsHero() {
    return (
        <section className="overflow-hidden relative py-5 px-10 mt-15">

            {/* Small screen */}
            <div className="block md:hidden space-y-4">
                <ImageCard src={image1} alt="External Image" className="h-[200px] w-full" />
                <TextBox
                    headline="Welcome to GlowNest"
                    subheadline="Elevate your beauty with GlowNest — appointments available now."
                    showButton={false}
                />
            </div>

            {/* Medium screen */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
                <ImageCard src={image1} alt="External Image" className="min-h-[250px]" />
                <TextBox
                    headline="Welcome to GlowNest"
                    subheadline="Elevate your beauty with GlowNest — appointments available now."
                    showButton={false}
                />

            </div>

            {/* Large screen */}
            <div className="hidden lg:grid grid-cols-6 grid-rows-6 gap-2 h-[75vh] overflow-hidden">
                <ImageCard src={image5} alt="External Image" className="row-span-2 col-start-4 row-start-4" />
                <ImageCard src={image3} alt="External Image" className="row-span-3 col-start-4 row-start-1" />
                <ImageCard src={image2} alt="External Image" className="row-span-3 col-start-3 row-start-2" />
                <ImageCard src={image1} alt="External Image" className="col-span-2 row-span-3 col-start-5 row-start-3" />
                <ImageCard src={image4} alt="External Image" className="row-span-2 col-start-5 row-start-1" />
                <TextBox
                    showButton={false}
                    headline="Explore Our Curated Beauty Collection"
                    subheadline="Discover products designed to elevate your self-care ritual — because you deserve nothing less"
                    className="col-span-2 row-span-2 row-start-2"
                />

            </div>
        </section>
    );
}
