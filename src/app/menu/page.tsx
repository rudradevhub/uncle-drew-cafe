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

const MAX_PAGES = 16; // 17 total spreads (0 through 16)

const SPREAD_IMAGES = Array.from({ length: 17 }, (_, i) => {
  if (i === 0) return '/menu-pages/PAGE-00.jpg';
  return `/menu-pages/page-${i.toString().padStart(2, '0')}.jpg`;
});

export default function MenuPage() {
  useIntroRegistry(SPREAD_IMAGES);
  
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

  // Global Input Listeners for Desktop wheel/arrows
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

      <div className="relative w-full flex-grow flex flex-col lg:flex-row items-center pt-20 md:pt-0">
        
        {/* Back Home Button */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
          <Link
            href="/"
            className="inline-block px-5 py-2 md:px-7 md:py-2.5 rounded-full text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-xs md:text-xl transition-all hover:bg-[#1A1A1A] hover:text-[#F3F0E7] active:scale-95"
            style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            ← Back Home
          </Link>
        </div>

        {/* Desktop Category Navigation Sidebar */}
        <MenuNavigation
          activeCategoryIndex={activePageIndex}
          onSelectCategory={(index) => setActivePageIndex(index)}
        />

        {/* =========================================================
            DESKTOP VIEW: Your exact uncompromised 3D Book Viewport 
           ========================================================= */}
        <section className="hidden md:flex flex-grow h-full flex-col items-center justify-center relative px-4 lg:px-8">
          <MenuBook currentPage={activePageIndex} />

          <div className="mt-8">
            <Controls
              onPrev={handlePrev}
              onNext={handleNext}
              canPrev={activePageIndex > 0}
              canNext={activePageIndex < MAX_PAGES} 
            />
          </div>
        </section>


        {/* =========================================================
            MOBILE VIEW: 1920x1080 (16:9) flip-clock style card stack 
           ========================================================= */}
        <section className="flex md:hidden flex-col w-full px-4 items-center justify-center my-auto py-12">
          
          {/* Mobile Category Quick Bar */}
          <div className="w-full overflow-x-auto pb-4 mb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div className="flex items-center gap-2 w-max mx-auto px-2">
              {[
                { name: 'COVER', targetIndex: 0 },
                { name: 'BAKERY', targetIndex: 1 },
                { name: 'BRUNCH', targetIndex: 2 },
                { name: 'MAINS', targetIndex: 3 },
                { name: 'DESSERTS', targetIndex: 4 },
                { name: 'COFFEE', targetIndex: 5 },
                { name: 'DRINKS', targetIndex: 6 },
                { name: 'ALCOHOL', targetIndex: 12 },
              ].map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActivePageIndex(cat.targetIndex)}
                  className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${
                    activePageIndex === cat.targetIndex
                      ? 'bg-[#1A1A1A] text-[#F3F0E7] font-bold'
                      : 'bg-[#EFEADF] text-[#1A1A1A]/70'
                  }`}
                  style={{ fontFamily: "'Indie Flower', cursive" }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* 16:9 Clean Aspect Ratio Card Frame */}
          <div className="w-full max-w-[420px] aspect-video bg-[#FDFBF7] shadow-xl border border-[#1A1A1A]/10 rounded-sm relative overflow-hidden flex items-center justify-center">
            <img 
              src={SPREAD_IMAGES[activePageIndex]} 
              alt={`Menu Spread ${activePageIndex}`}
              className="w-full h-full object-cover select-none"
            />
          </div>

          {/* Mobile Controls */}
          <div className="mt-6">
            <Controls
              onPrev={handlePrev}
              onNext={handleNext}
              canPrev={activePageIndex > 0}
              canNext={activePageIndex < MAX_PAGES} 
            />
          </div>
        </section>


        {/* Page Spread Indicator */}
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

      <div className="w-full shrink-0 relative z-50 bg-[#F3F0E7]">
        <CinematicFooter />
      </div>

    </main>
  );
}