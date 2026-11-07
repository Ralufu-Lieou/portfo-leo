
import React from 'react';
import { motion } from 'framer-motion';
import HeroCanvasBg from './HeroCanvasBg';
import { PORTFOLIO_INFO } from '../data/portfolioData';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 overflow-hidden"
    >
      {/* Animated emerald background */}
      <HeroCanvasBg />

      {/* Central hero frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          relative z-10
          w-full max-w-6xl mx-auto
          border border-white/20
          bg-black/20
          backdrop-blur-[1px]
          p-8 sm:p-12 md:p-16
          rounded-none
          flex flex-col justify-between
          min-h-[420px] md:min-h-[480px]
          shadow-2xl
          text-white
        "
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.20)',
          borderColor: 'rgba(168, 217, 200, 0.28)',
        }}
      >
        {/* Four emerald corner markers */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#65C6A8] z-20 pointer-events-none" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#65C6A8] z-20 pointer-events-none" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#65C6A8] z-20 pointer-events-none" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#65C6A8] z-20 pointer-events-none" />

        {/* Role label */}
        <div className="w-full text-center mb-3">
          <span
            className="
              font-medium
              text-[#A8D9C8]
              text-xs md:text-[15px]
              tracking-[0.42em]
              uppercase
            "
          >
            Lead Product Designer
          </span>
        </div>

        {/* Name and introduction */}
        <div className="flex flex-col items-center justify-center text-center my-auto py-2">

          <h1
            className="
              font-display
              font-semibold
              text-4xl sm:text-6xl
              md:text-7xl lg:text-[88px]
              xl:text-[104px]
              tracking-[-0.075em]
              text-[#00C98D]
              leading-[0.95]
              select-none
              w-full
            "
          >
            Ralph Leo
          </h1>

          <p
            className="
              mt-6 md:mt-8
              max-w-4xl
              text-[#C2DAD1]
              text-xs sm:text-sm
              md:text-[16px]
              font-normal
              leading-[1.6]
              text-center
              px-2
            "
          >
            {PORTFOLIO_INFO.bio}
          </p>
        </div>

        {/* Centred location */}
        <div
          className="
            w-full pt-8
            text-center
            text-[12px] md:text-[13px]
            font-medium
            text-[#A8D9C8]
            tracking-wide
            select-none
          "
        >
          Chennai, India
        </div>

      </motion.div>
    </section>
  );
}
