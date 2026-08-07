'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/explore/tags/uncledrewcafe/' },
  { name: 'Facebook', url: 'https://www.facebook.com/uncledrewcafe/?fref=ts' },
  { name: 'Maps', url: 'https://www.google.com/maps/place/uncle+drew+cafe/' },
];

interface CinematicHeaderProps {
  hideDesktopMenuButton?: boolean;
}

export default function CinematicHeader({ hideDesktopMenuButton = false }: CinematicHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const lastYRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(currentY > 50);

      if (currentY > lastYRef.current && currentY > 150 && !isOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false); 
      }
      lastYRef.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen]);

  const overlayVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 30, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    open: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out px-4 md:px-12 pointer-events-none
          ${isHidden ? '-translate-y-full' : 'translate-y-0'}
          ${isScrolled || isOpen ? 'py-4 md:py-6' : 'py-6 md:py-10'}
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              pointer-events-auto flex items-center gap-2 md:gap-3 px-5 py-2 md:px-6 md:py-2.5 rounded-full
              text-xs md:text-base font-bold uppercase tracking-widest transition-all duration-300
              ${hideDesktopMenuButton ? 'md:hidden' : ''}
              ${isOpen 
                ? 'bg-[#1A1A1A] text-[#F3F0E7] hover:bg-[#8B3A2B]' 
                : isScrolled 
                  ? 'bg-[#F3F0E7]/90 backdrop-blur-md text-[#1A1A1A] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-[#1A1A1A] hover:text-[#F3F0E7]'
                  : 'bg-transparent text-[#1A1A1A] hover:opacity-60'
              }
            `}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            <span>{isOpen ? 'Close' : 'Menu'}</span>
            <span className="text-sm md:text-lg relative top-[1px]">{isOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </header>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 z-[90] bg-[#F3F0E7] flex flex-col selection:bg-[#1A1A1A] selection:text-[#F3F0E7] overflow-y-auto md:overflow-hidden"
            >
              <div className="fixed inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

              <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between min-h-full pt-28 md:pt-20 pb-12 md:pb-0">
                
                <motion.nav 
                  variants={staggerVariants}
                  className="relative z-10 flex flex-col items-start w-full md:w-1/2 mb-12 md:mb-0"
                >
                  <motion.h3 
                    variants={itemVariants}
                    className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/40 mb-6 md:mb-12"
                  >
                    Directory
                  </motion.h3>

                  <ul className="flex flex-col items-start gap-4 md:gap-6 w-full">
                    {NAV_LINKS.map((link) => (
                      <motion.li key={link.name} variants={itemVariants} className="w-full text-left border-b border-[#1A1A1A]/10 pb-4 last:border-0">
                        <Link
                          href={link.href}
                          className="group relative inline-block text-4xl md:text-7xl font-bold uppercase tracking-wider text-[#1A1A1A] transition-colors duration-300 hover:text-[#8B3A2B]"
                          style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
                        >
                          {link.name}
                          <span className="absolute top-1/2 -left-8 md:-left-12 w-4 md:w-6 h-[3px] bg-[#8B3A2B] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden md:block" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>

                <motion.div 
                  variants={staggerVariants}
                  className="flex flex-col justify-end w-full md:w-1/3 md:h-full pt-8 md:pt-0 pb-8 md:pb-24 border-t md:border-t-0 md:border-l border-[#1A1A1A]/10 md:pl-12"
                >
                  <motion.div variants={itemVariants} className="space-y-10 md:space-y-12">
                    
                    <div className="relative p-5 md:p-6 border-2 border-dashed border-[#8B3A2B]/40 bg-[#F7F2E8] rounded-sm transform rotate-[1deg]">
                      <h4 
                        className="text-lg md:text-xl font-bold uppercase tracking-wider text-[#8B3A2B] mb-2"
                        style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
                      >
                        No Bookings
                      </h4>
                      <p className="text-xs md:text-sm opacity-80 font-medium tracking-wide leading-relaxed text-[#1A1A1A]">
                        We operate on a strictly walk-in basis. Come on by, we'll find a place for you.
                      </p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-mono font-bold">
                        Visit Us
                      </h3>
                      <p className="text-sm leading-relaxed text-[#1A1A1A]/80 font-medium">
                        23 Groom St<br />
                        Clifton Hill VIC 3068<br />
                        Australia
                      </p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-mono font-bold">
                        Connect
                      </h3>
                      <div className="flex gap-4 md:gap-6 flex-wrap">
                        {SOCIAL_LINKS.map((social) => (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#8B3A2B] transition-colors"
                          >
                            {social.name}
                          </a>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}