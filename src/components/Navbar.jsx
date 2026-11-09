
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { NAVBAR_DATA, PORTFOLIO_INFO } from '../data/portfolioData';

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const headerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const detectSectionTheme = () => {
      const header = headerRef.current;
      if (!header) return;

      const headerRect = header.getBoundingClientRect();

      // Check the section immediately below the fixed navigation.
      const sampleX = window.innerWidth / 2;
      const sampleY = Math.min(
        window.innerHeight - 1,
        headerRect.bottom + 12
      );

      const element = document.elementFromPoint(sampleX, sampleY);

      let current = element;
      let lightBackground = false;

      // Walk through parent elements to find the actual section background.
      while (current && current !== document.documentElement) {
        const bg = window.getComputedStyle(current).backgroundColor;

        const match = bg.match(
          /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/
        );

        if (match) {
          const r = Number(match[1]);
          const g = Number(match[2]);
          const b = Number(match[3]);
          const alpha = match[4] !== undefined
            ? Number(match[4])
            : 1;

          if (alpha > 0.1) {
            // Perceived brightness of the background.
            const brightness =
              (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            lightBackground = brightness > 0.72;
            break;
          }
        }

        current = current.parentElement;
      }

      setIsLightSection(lightBackground);
      setScrolled(window.scrollY > 30);

      // Track the Work section for active navigation styling.
      const workElement = document.getElementById('work');

      if (workElement) {
        const rect = workElement.getBoundingClientRect();

        const isWorkVisible =
          rect.top < window.innerHeight * 0.65 &&
          rect.bottom > window.innerHeight * 0.15;

        setActiveSection(isWorkVisible ? 'work' : null);
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

  // Return to the top of the portfolio.
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

  // Scroll to a page section.
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

  const brandName =
    NAVBAR_DATA?.name ||
    PORTFOLIO_INFO?.name ||
    'RALPH LEO';

  // Theme colours.
  const textColor = isLightSection
    ? '#101713'
    : '#A8D9C8';

  const logoFilter = isLightSection
    ? 'brightness(0) saturate(100%)'
    : 'none';

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
      "
      style={{
        backgroundColor: isLightSection
          ? 'rgba(255, 255, 255, 0.96)'
          : 'transparent',

        borderBottom: isLightSection
          ? '1px solid rgba(0, 0, 0, 0.07)'
          : '1px solid transparent',

        boxShadow: isLightSection
          ? '0 2px 16px rgba(0, 0, 0, 0.025)'
          : 'none',

        transition:
          'background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      <div className="
        max-w-7xl mx-auto
        px-6 md:px-12
        py-5 md:py-6
        flex items-center justify-between
      ">

        {/* Brand Logo */}
        <button
          onClick={scrollToTop}
          className="
            cursor-pointer
            flex items-center
            bg-transparent
            border-none
            outline-none
          "
          aria-label="Go to homepage"
        >
          <img
            src="/RL-Logo-header.svg"
            alt={brandName}
            className="
              w-28 md:w-36
              h-auto
              object-contain
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
            const isActive =
              activeSection === link.id;

            const handleClick = () => {
              if (
                isAction &&
                link.action === 'openResume'
              ) {
                onOpenResume?.();
              } else if (!isAction) {
                scrollToSection(
                  link.target || link.id
                );
              }
            };

            return (
              <button
                key={link.id}
                onClick={handleClick}
                className="
                  relative
                  cursor-pointer
                  text-sm md:text-base
                  font-medium
                  tracking-wide
                  bg-transparent
                  border-none
                  outline-none
                  transition-colors duration-300
                  flex flex-col
                  items-center
                "
                style={{
                  color: textColor,
                }}
              >
                {/* Hover text roll */}
                <span className="relative overflow-hidden">
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
                    "
                  >
                    {link.label}
                  </span>
                </span>

                {/* Active underline */}
                <span
                  className="
                    absolute -bottom-2 left-0
                    h-px w-full
                    origin-left
                    transition-transform duration-300
                  "
                  style={{
                    backgroundColor: textColor,
                    transform: isActive
                      ? 'scaleX(1)'
                      : 'scaleX(0)',
                  }}
                />
              </button>
            );
          })}
        </nav>

      </div>
    </motion.header>
  );
}
