import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BsStars } from "react-icons/bs"; // sparkling stars
import { GiLipstick } from "react-icons/gi"; // lipstick as the fancy salon icon

const subtitles = [
  "Hold on, we're prepping magic…",
  "Perfecting your sparkle…",
  "Almost ready to shine…"
];

function GlowNestSpinner() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-white overflow-hidden">
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#B37C3A] via-[#F2D0C4] to-[#7A2477] p-2 shadow-lg"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        {/* Glowing blur aura */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#F2D0C4] opacity-30 blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />

        {/* Animated Lipstick */}
        <motion.div
          className="z-10 drop-shadow-xl"
          animate={{ y: [0, -4, 0], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <GiLipstick className="text-white text-5xl" />
        </motion.div>

        <motion.div
          className="absolute -top-2 -right-2 z-10"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <BsStars className="text-white text-xl" />
        </motion.div>

        {/* Glow pulse ring */}
        <motion.div
          className="absolute w-full h-full rounded-full border-2 border-[#c06c18] opacity-40"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.span
        className="mt-6 text-[#C88D94] text-lg font-semibold tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        Making you glow...
      </motion.span>

      <motion.span
        key={subtitleIndex}
        className="mt-2 text-[#B37C3A] text-base tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.8 }}
      >
        {subtitles[subtitleIndex]}
      </motion.span>
    </div>
  );
}

export default GlowNestSpinner;
