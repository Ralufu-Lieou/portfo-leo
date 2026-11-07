import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroCanvasBg() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-[#00110B]/65" />
    </motion.div>
  );
}
