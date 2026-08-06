'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MenuNavigation from '@/components/modules/menu/MenuNavigation';
import Controls from '@/components/modules/menu/Controls';
import MenuBook from '@/components/modules/menu/MenuBook';
import CinematicFooter from '@/components/modules/footer/CinematicFooter';

import { useIntroRegistry } from '@/hooks/useIntroRegistry';
import { useIntro } from '@/contexts/IntroContext';

const MAX_PAGES = 16; // 17 total spreads (0 through 16)

// Generated the array of all 17 high-res menu spread URLs
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

  // Navigation Logic
  const handlePrev = () => setActivePageIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setActivePageIndex((prev) => Math.min(MAX_PAGES, prev + 1));

  // Global Input Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check cross-browser scroll position safely
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      
      // If user is looking at the footer, ignore book hotkeys
      if (currentScroll > 10) return;
      
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    const handleWheel = (e: WheelEvent) => {
      // Safely calculate how far down the window is scrolled
      const currentScroll = window.scrollY || document.documentElement.scrollTop;

      // 1. If we are currently scrolled down into the footer, let the native browser handle scrolling up/down!
      if (currentScroll > 5) return; 

      // 2. If the book is flipping, wait for it to finish
      if (isAnimatingRef.current) {
        if (activePageIndex < MAX_PAGES) e.preventDefault();
        return;
      }

      // 3. Logic for flipping the book when we are at the top of the page (currentScroll <= 5)
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) { // Scrolling DOWN
          if (activePageIndex < MAX_PAGES) {
            e.preventDefault(); // Stop window from scrolling down
            isAnimatingRef.current = true;
            handleNext();
            setTimeout(() => (isAnimatingRef.current = false), 1200);
          }
          // Note: If activePageIndex === MAX_PAGES, we DO NOT preventDefault(). 
          // This elegantly unlocks the page and lets the browser scroll down to the footer!
        
        } else { // Scrolling UP
          if (activePageIndex > 0) {
            e.preventDefault(); // Stop bounce effect on macs
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
    // FIX: Removed 'overflow-y-auto h-screen', changed to 'min-h-screen' so the window can natively scroll!
    <main className="relative w-full min-h-screen bg-[#F3F0E7] overflow-x-hidden scroll-smooth select-none">
      
      {/* --- MENU BOOK SECTION (Fixed exactly to 100vh so it fills the screen perfectly) --- */}
      <div className="relative w-full h-screen flex shrink-0">
        
        {/* Global Back Button */}
        <div className="absolute top-10 left-10 z-50">
          <Link
            href="/"
            className="inline-block px-7 py-2.5 rounded-full text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-[22px] transition-all hover:bg-[#1A1A1A] hover:text-[#F3F0E7] active:scale-95"
            style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            ← Back Home
          </Link>
        </div>

        {/* Category Sub Navigation (Left Sidebar) */}
        <MenuNavigation
          activeCategoryIndex={activePageIndex}
          onSelectCategory={(index) => setActivePageIndex(index)}
        />

        {/* Central Book Viewport */}
        <section className="flex-grow h-full flex flex-col items-center justify-center relative px-4 lg:px-8">
          
          <MenuBook currentPage={activePageIndex} />

          {/* Controls Placement */}
          <div className="mt-8">
            <Controls
              onPrev={handlePrev}
              onNext={handleNext}
              canPrev={activePageIndex > 0}
              canNext={activePageIndex < MAX_PAGES} 
            />
          </div>
        </section>

        {/* Page Indicator */}
        <div className="absolute bottom-8 right-12 z-50 pointer-events-none flex flex-col items-end gap-2">
          <p
            className="text-[#1A1A1A] text-sm uppercase tracking-widest font-bold opacity-60"
            style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            Spread {activePageIndex} of {MAX_PAGES}
          </p>
          
          <div 
            className={`text-xs font-mono font-bold text-[#8B3A2B] uppercase tracking-widest transition-opacity duration-500 ${
              activePageIndex === MAX_PAGES ? 'opacity-100 animate-pulse' : 'opacity-0'
            }`}
          >
            Scroll down to finish ↓
          </div>
        </div>

      </div>

      {/* --- FOOTER SECTION (Sits beneath the book, unlocked at the end) --- */}
      <div className="w-full shrink-0 relative z-50 bg-[#F3F0E7]">
        <CinematicFooter />
      </div>

    </main>
  );
}