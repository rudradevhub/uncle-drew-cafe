'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MenuNavigation from '@/components/modules/menu/MenuNavigation';
import Controls from '@/components/modules/menu/Controls';
import MenuBook from '@/components/modules/menu/MenuBook';
import CinematicFooter from '@/components/modules/footer/CinematicFooter';
import CinematicHeader from '@/components/modules/header/CinematicHeader';

import { useIntroRegistry } from '@/hooks/useIntroRegistry';
import { useIntro } from '@/contexts/IntroContext';

const MAX_PAGES = 16; 

const MENU_ASSETS = Array.from({ length: 17 }, (_, i) => 
  `/menu-pages/page-${(i).toString().padStart(2, '0')}.jpg`
);

export default function MenuPage() {
  useIntroRegistry(MENU_ASSETS);
  
  const { setPageReady } = useIntro();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 3000); 
    return () => clearTimeout(timer);
  }, [setPageReady]);

  const [activePageIndex, setActivePageIndex] = useState(0);
  const isAnimatingRef = useRef(false);

  const handlePrev = () => setActivePageIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setActivePageIndex((prev) => Math.min(MAX_PAGES, prev + 1));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > 10) return;
      
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    const handleWheel = (e: WheelEvent) => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > 5) return; 

      if (isAnimatingRef.current) {
        if (activePageIndex < MAX_PAGES) e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          if (activePageIndex < MAX_PAGES) {
            e.preventDefault();
            isAnimatingRef.current = true;
            handleNext();
            setTimeout(() => (isAnimatingRef.current = false), 1200);
          }
        } else {
          if (activePageIndex > 0) {
            e.preventDefault();
            isAnimatingRef.current = true;
            handlePrev();
            setTimeout(() => (isAnimatingRef.current = false), 1200);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activePageIndex]); 

  return (
    <main className="relative w-full min-h-screen bg-[#F3F0E7] overflow-x-hidden scroll-smooth select-none flex flex-col">
      
      <CinematicHeader />

      {/* Main Screen Content Layout */}
      <div className="relative w-full flex-grow flex flex-col lg:flex-row items-center">
        
        {/* Global Back Button (Desktop absolute, mobile static or top-left) */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
          <Link
            href="/"
            className="inline-block px-5 py-2 md:px-7 md:py-2.5 rounded-full text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-sm md:text-xl transition-all hover:bg-[#1A1A1A] hover:text-[#F3F0E7] active:scale-95"
            style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            ← Back Home
          </Link>
        </div>

        {/* Category Navigation (Mobile horizontal bar + Desktop sidebar) */}
        <MenuNavigation
          activeCategoryIndex={activePageIndex}
          onSelectCategory={(index) => setActivePageIndex(index)}
        />

        {/* Central Book Viewport */}
        <section className="flex-grow w-full h-full flex flex-col items-center justify-center relative px-4 py-8 lg:py-0">
          
          <MenuBook currentPage={activePageIndex} />

          {/* Controls Placement */}
          <div className="mt-6 md:mt-8">
            <Controls
              onPrev={handlePrev}
              onNext={handleNext}
              canPrev={activePageIndex > 0}
              canNext={activePageIndex < MAX_PAGES} 
            />
          </div>
        </section>

        {/* Page Indicator */}
        <div className="absolute bottom-4 right-6 md:bottom-8 md:right-12 z-50 pointer-events-none flex flex-col items-end gap-1">
          <p
            className="text-[#1A1A1A] text-xs md:text-sm uppercase tracking-widest font-bold opacity-60"
            style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            Spread {activePageIndex} of {MAX_PAGES}
          </p>
          
          <div 
            className={`text-[10px] md:text-xs font-mono font-bold text-[#8B3A2B] uppercase tracking-widest transition-opacity duration-500 ${
              activePageIndex === MAX_PAGES ? 'opacity-100 animate-pulse' : 'opacity-0'
            }`}
          >
            Scroll down to finish ↓
          </div>
        </div>

      </div>

      {/* Footer Section */}
      <div className="w-full shrink-0 relative z-50 bg-[#F3F0E7]">
        <CinematicFooter />
      </div>

    </main>
  );
}