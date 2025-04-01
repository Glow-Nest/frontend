"use client";

import Image, { StaticImageData } from 'next/image';

export default function ImageCard({ src, alt, className }: { src: StaticImageData; alt: string; className?: string }) {
    return (
        <div
            className={`relative overflow-hidden rounded-xl shadow-md transform transition-transform duration-500 hover:scale-105 ${className} animate-fade-in`}
        >
            <Image
                src={src}
                alt={alt}
                fill
                unoptimized
                loading="lazy"
                role="img"
                className="object-cover cursor-pointer transition-all duration-700 grayscale-[30%] hover:grayscale-0 hover:brightness-110"
            />
        </div>
    );
}
