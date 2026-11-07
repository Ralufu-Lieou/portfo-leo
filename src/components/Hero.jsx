
import React from 'react';
import { motion } from 'framer-motion';
import HeroCanvasBg from './HeroCanvasBg';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 overflow-hidden"
    >
      {/* Dark emerald silk video background */}
      <HeroCanvasBg />

      {/* Central hero frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 w-full max-w-6xl mx-auto border border-white/20 bg-black/50 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-none flex flex-col justify-between min-h-[420px] md:min-h-[480px] shadow-2xl text-white"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          borderColor: 'rgba(168, 217, 200, 0.28)',
        }}
      >
        {/* Corner markers */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#69C9A9] z-20" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#69C9A9] z-20" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#69C9A9] z-20" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#69C9A9] z-20" />

        {/* Role label */}
        <div className="text-center w-full mb-6">
          <span className="text-[#A8D9C8] text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
            Lead Product Designer
          </span>
        </div>

        {/* Name and positioning statement */}
        <div className="flex flex-col items-center justify-center text-center my-auto py-4">
          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[104px] 2xl:text-[116px] tracking-tight text-[#00C98B] leading-[0.96] select-none w-full">
            Ralph Leo
          </h1>

          <p className="mt-6 md:mt-8 max-w-3xl text-[#C1D8CE] text-xs sm:text-sm md:text-[15px] font-normal leading-[1.7] text-center px-2">
            9+ years designing enterprise, e-commerce and digital
            experiences — turning complex business requirements into
            scalable products, workflows and design systems.
          </p>
        </div>

        {/* Location and scroll indicator */}
        <div className="flex items-center justify-between w-full pt-8 text-[11px] md:text-[13px] font-medium text-[#A8D9C8] select-none">
          <span className="tracking-wide">Chennai, India</span>
          <span className="tracking-[0.18em] uppercase">
            Scroll ↓
          </span>
        </div>
      </motion.div>
    </section>
  );
}
