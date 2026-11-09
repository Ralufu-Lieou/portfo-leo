
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAVBAR_DATA, PORTFOLIO_INFO } from '../data/portfolioData';

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const workEl = document.getElementById('work');

      if (workEl) {
        const rect = workEl.getBoundingClientRect();

        const isInWork =
          rect.top <= window.innerHeight * 0.65 &&
          rect.bottom >= window.innerHeight * 0.15;

        setActiveSection(isInWork ? 'work' : null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    if (window.lenis) {
      window.lenis.scrollTo(element, { duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setActiveSection(null);
  };

  const brandName =
    NAVBAR_DATA?.name ||
    PORTFOLIO_INFO?.name ||
    'RALPH LEO';

  const links = NAVBAR_DATA?.links || [
    { id: 'work', label: 'Work', type: 'scroll', target: 'work' },
    { id: 'resume', label: 'Resume', type: 'action', action: 'openResume' }
  ];

  const handleClick = (link) => {
    if (link.type === 'action' && link.action === 'openResume') {
      onOpenResume?.();
      return;
    }

    if (link.type === 'scroll') {
      scrollToSection(link.target || link.id);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'navbar-scrolled backdrop-blur-xl'
          : 'navbar-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-5 md:py-6 flex items-center justify-between">

        {/* Brand Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-center cursor-pointer"
          aria-label="Go to homepage"
        >
          <img
            src="/RL-Logo-header.svg"
            alt={brandName}
            className="w-28 md:w-36 h-auto object-contain"
            draggable="false"
          />
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8 md:gap-12">
          {links.map((link) => {
            const isWork = link.id === 'work';
            const isActive = isWork && activeSection === 'work';

            return (
              <button
                key={link.id || link.label}
                onClick={() => handleClick(link)}
                className={`nav-link group relative cursor-pointer text-sm md:text-base font-medium tracking-wide ${
                  isActive ? 'nav-link-active' : ''
                }`}
                aria-label={link.label}
              >
                <span className="nav-link-text">
                  {link.label}
                </span>
              </button>
            );
          })}
        </nav>

      </div>
    </motion.header>
  );
}
