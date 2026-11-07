
import React from 'react';
import { motion } from 'framer-motion';
import HeroCanvasBg from './HeroCanvasBg';

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
          px-6 py-10
          sm:px-12 sm:py-12
          md:px-16 md:py-14
          rounded-none
          flex flex-col items-center justify-center
          min-h-[440px] md:min-h-[500px]
          shadow-2xl
          text-white
        "
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.20)',
          borderColor: 'rgba(168, 217, 200, 0.28)',
        }}
      >
        {/* Corner markers */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#65C6A8] z-20 pointer-events-none" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#65C6A8] z-20 pointer-events-none" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#65C6A8] z-20 pointer-events-none" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#65C6A8] z-20 pointer-events-none" />

        {/* Main identity group */}
        <div className="w-full flex flex-col items-center text-center">

          {/* Role */}
          <span
            className="
              font-medium
              text-[#A8D9C8]
              text-xs sm:text-sm md:text-[15px]
              tracking-[0.42em]
              uppercase
              mb-3 md:mb-4
            "
          >
            Lead Product Designer
          </span>

          {/* Name */}
          <h1
            className="
              font-display
              font-semibold
              text-4xl sm:text-6xl
              md:text-7xl lg:text-[88px]
              xl:text-[104px]
              tracking-[-0.075em]
              text-[#00C98D]
              leading-[0.88]
              select-none
              w-full
            "
          >
            Ralph Leo
          </h1>

          {/* Introduction */}
          <p
            className="
              mt-5 md:mt-6
              max-w-4xl
              text-[#C2DAD1]
              text-xs sm:text-sm md:text-[16px]
              font-normal
              leading-[1.55]
              tracking-[-0.015em]
              text-center
              px-2
            "
          >
            9+ years shaping enterprise products and digital experiences,
            connecting business strategy, user needs and technology
            through thoughtful product design.
          </p>

        </div>

        {/* Centred location */}
        <div
          className="
            w-full
            mt-12 md:mt-16
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
