"use client";

import { motion } from "framer-motion";

export default function VideoCard({
  src,
  alt,
  className,
}: {
  src: string; // The src is now a string representing the video file path
  alt: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-xl shadow-md transform transition-transform duration-500 hover:scale-105 ${className}`}
    >
      <video
        src={src}
        autoPlay
        playsInline
        className="object-cover cursor-pointer transition-all duration-700 grayscale-[30%] hover:grayscale-0 hover:brightness-110 w-full h-full"
        loop
        muted
      >
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
}
