
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { NAVBAR_DATA, PORTFOLIO_INFO } from '../data/portfolioData';

export default function Navbar({ onOpenResume }) {
  const [isLightSection, setIsLightSection] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const rafRef = useRef(null);

  // Detect whether the header is currently over a light or dark section.
  useEffect(() => {
    const detectSectionTheme = () => {
      const headerHeight = 100;
      const sampleX = window.innerWidth / 2;
      const sampleY = Math.min(
        window.innerHeight - 1,
        headerHeight + 20
      );

      const element = document.elementFromPoint(sampleX, sampleY);

      let current = element;
      let detectedLight = false;

      while (current && current !== document.documentElement) {
        const style = window.getComputedStyle(current);
        const background = style.backgroundColor;

        const match = background.match(
          /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/
        );

        if (match) {
          const r = Number(match[1]);
          const g = Number(match[2]);
          const b = Number(match[3]);
          const alpha =
            match[4] !== undefined ? Number(match[4]) : 1;

          if (alpha > 0.1) {
            const brightness =
              (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            detectedLight = brightness > 0.72;
            break;
          }
        }

        current = current.parentElement;
      }

      setIsLightSection(detectedLight);

      // Detect active Work section.
      const workElement = document.getElementById('work');

      if (workElement) {
        const rect = workElement.getBoundingClientRect();

        const isWorkVisible =
          rect.top < window.innerHeight * 0.65 &&
          rect.bottom > window.innerHeight * 0.15;

        setActiveSection(isWorkVisible ? 'work' : null);
      } else {
        setActiveSection(null);
      }
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(detectSectionTheme);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', handleScroll);

    detectSectionTheme();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Theme colours.
  const textColor = isLightSection
    ? '#101713'
    : '#A8D9C8';

  const logoFilter = isLightSection
    ? 'brightness(0) saturate(100%)'
    : 'none';

  // Scroll to top.
  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    setActiveSection(null);
  };

  // Navigate to a section.
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    if (window.lenis) {
      window.lenis.scrollTo(element);
    } else {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setActiveSection(id);
  };

  // Navigation data.
  const brandName =
    NAVBAR_DATA?.name ||
    PORTFOLIO_INFO?.name ||
    'RALPH LEO';

  const links = NAVBAR_DATA?.links || [
    {
      id: 'work',
      label: 'Work',
      type: 'scroll',
      target: 'work',
    },
    {
      id: 'resume',
      label: 'Resume',
      type: 'action',
      action: 'openResume',
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
      "
      style={{
        // Frosted glass background.
        backgroundColor: isLightSection
          ? 'rgba(255, 255, 255, 0.82)'
          : 'rgba(2, 12, 8, 0.72)',

        // Blur the content scrolling underneath.
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',

        // Subtle section-aware border.
        borderBottom: isLightSection
          ? '1px solid rgba(0, 0, 0, 0.07)'
          : '1px solid rgba(168, 217, 200, 0.10)',

        boxShadow: isLightSection
          ? '0 4px 24px rgba(0, 0, 0, 0.025)'
          : '0 4px 24px rgba(0, 0, 0, 0.12)',

        transition:
          'background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease',
      }}
    >
      <div
        className="
          max-w-7xl mx-auto
          px-6 md:px-12
          py-4 md:py-5
          flex items-center justify-between
        "
      >
        {/* Logo */}
        <button
          onClick={scrollToTop}
          aria-label="Go to homepage"
          className="
            flex items-center
            bg-transparent border-none outline-none
            cursor-pointer
          "
        >
          <img
            src="/RL-Logo-header.svg"
            alt={brandName}
            className="
              w-28 md:w-36
              h-auto object-contain
              transition-all duration-300
            "
            style={{
              filter: logoFilter,
            }}
            draggable="false"
          />
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-8 md:gap-12">
          {links.map((link) => {
            const isAction = link.type === 'action';
            const isActive = activeSection === link.id;

            const handleClick = () => {
              if (
                isAction &&
                link.action === 'openResume'
              ) {
                onOpenResume?.();
              } else if (!isAction) {
                scrollToSection(link.target || link.id);
              }
            };

            return (
              <button
                key={link.id}
                onClick={handleClick}
                className="
                  group relative
                  cursor-pointer
                  bg-transparent border-none outline-none
                  text-sm md:text-base
                  font-medium tracking-wide
                  transition-colors duration-300
                "
                style={{
                  color: textColor,
                }}
              >
                {/* Hover text animation */}
                <span className="relative block overflow-hidden">
                  <span
                    className="
                      block
                      transition-transform duration-300
                      group-hover:-translate-y-full
                    "
                  >
                    {link.label}
                  </span>

                  <span
                    className="
                      absolute top-full left-0
                      block
                      transition-transform duration-300
                      group-hover:-translate-y-full
                    "
                  >
                    {link.label}
                  </span>
                </span>

              </button>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
