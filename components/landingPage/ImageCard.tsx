"use client";

import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';

export default function ImageCard({ src, alt, className }: { src: StaticImageData; alt: string; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-xl shadow-md transform transition-transform duration-500 hover:scale-105 ${className}`}
        >
            <Image
                src={src}
                alt={alt}
                fill
                loading="lazy"
                role="img"
                className="object-cover cursor-pointer transition-all duration-700 grayscale-[30%] hover:grayscale-0 hover:brightness-110"
            />
        </motion.div>
    );
}
