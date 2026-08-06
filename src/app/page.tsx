'use client';

import React, { useEffect } from 'react';
import { useIntro } from '@/contexts/IntroContext';
import CinematicHeader from '@/components/modules/header/CinematicHeader';
import CinematicFooter from '@/components/modules/footer/CinematicFooter';

import HeroSection from '@/components/modules/home/HeroSection';
import CanvasAnimationSection from '@/components/modules/home/CanvasAnimationSection';
import MenuDiscoverySection from '@/components/modules/home/MenuDiscoverySection';
import VisitSection from '@/components/modules/home/VisitSection';
import SkipButton from '@/components/modules/home/SkipButton';

export default function HomePage() {
  const { setPageReady } = useIntro();

  useEffect(() => {
    // FORCE HARD RESET TO TOP ON LOAD
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const timer = setTimeout(() => {
      setPageReady(true);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); // Lock top again when curtain drops
    }, 500);

    return () => clearTimeout(timer);
  }, [setPageReady]);

  return (
    <main className="relative w-full min-h-screen bg-[#F3F0E7] text-[#1A1A1A] overflow-x-hidden selection:bg-[#1A1A1A] selection:text-[#F3F0E7]">
      <CinematicHeader />
      
      <HeroSection />

      {/* --- BREATHING SPACE / BLANK BUFFER SECTION --- */}
      <div className="w-full h-[40vh] bg-[#F3F0E7] relative z-20 flex items-center justify-center">
        <div className="w-[1px] h-20 bg-[#1A1A1A]/10"></div>
      </div>

      <CanvasAnimationSection />
      <MenuDiscoverySection />
      <VisitSection />

      <SkipButton />

      <CinematicFooter />
    </main>
  );
}