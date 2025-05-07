"use client";

import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

interface TextBoxProps {
  headline: string;
  subheadline?: string;
  showButton?: boolean;
  className?: string;
  buttonText?: string;
}

export default function TextBox({
  headline,
  subheadline,
  showButton = true,
  buttonText = "Explore Our Services",
  className
}: TextBoxProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`flex flex-col items-center justify-center space-y-3 rounded-3xl p-8 ${className}`}
    >
      <p className="text-3xl font-bold text-[#dba052] text-center leading-relaxed drop-shadow-md tracking-wide">
        {headline}
      </p>

      <div className="w-30 h-[2px] bg-[#dba052] rounded"></div>

      {subheadline && (
        <p className="text-md font-semibold text-[#4d4b4b] text-center">
          {subheadline}
        </p>
      )}

      {showButton && (
        <button className="mt-2 px-5 py-2 cursor-pointer rounded-full border border-[#dba052] text-[#dba052] hover:bg-[#dba052] hover:text-black transition">
          {buttonText}
        </button>
      )}
    </motion.div>
  );
}
