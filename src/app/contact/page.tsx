'use client';

import React, { useEffect } from 'react';
import CinematicHeader from '@/components/modules/header/CinematicHeader';
import ContactHeader from '@/components/modules/contact/ContactHeader';
import ContactFormSection from '@/components/modules/contact/ContactFormSection';
import InteractiveMapCard from '@/components/modules/contact/InteractiveMapCard';
import SocialFollow from '@/components/modules/contact/SocialFollow';
import ContactFooter from '@/components/modules/contact/ContactFooter';
import CinematicFooter from '@/components/modules/footer/CinematicFooter';

import { useIntroRegistry } from '@/hooks/useIntroRegistry';
import { useIntro } from '@/contexts/IntroContext';

// IMPORTANT: Ensure your file is exactly named building.png in the public/contact/ folder.
// If it is a JPG, change this to '/contact/building.jpg'
const ASSETS_TO_LOAD = ['/contact/building.png'];

export default function ContactPage() {
  useIntroRegistry(ASSETS_TO_LOAD);
  
  const { setPageReady } = useIntro();

  useEffect(() => {
    // 3000ms fail-safe: Forces the loading curtain to lift after 3 seconds 
    // even if an asset is missing or struggling to load.
    const failSafeTimer = setTimeout(() => {
      setPageReady(true);
    }, 3000); 

    return () => clearTimeout(failSafeTimer);
  }, [setPageReady]);

  return (
    <main className="w-full min-h-screen bg-[#F3F0E7] text-[#1A1A1A] relative selection:bg-[#1A1A1A] selection:text-[#F3F0E7] overflow-x-hidden">
      
      {/* 1. The Floating Cinematic Header */}
      <CinematicHeader />

      <ContactHeader />

      <div className="px-6 md:px-16 max-w-7xl mx-auto pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16">
          <div className="w-full h-full">
            <ContactFormSection />
          </div>
          <div className="w-full h-full">
            <InteractiveMapCard />
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <SocialFollow />
      </div>

      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <ContactFooter />
      </div>

      {/* Cinematic Dark Luxury Footer as the final frame of the Contact experience */}
      <CinematicFooter />

    </main>
  );
}