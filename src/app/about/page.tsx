'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // <-- NEW: Detects internal routing
import CinematicHeader from '@/components/modules/header/CinematicHeader';
import HorizontalScroll from '@/components/modules/about/HorizontalScroll';
import CinematicFooter from '@/components/modules/footer/CinematicFooter';
import { useIntroRegistry } from '@/hooks/useIntroRegistry';
import { useIntro } from '@/contexts/IntroContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ASSETS_TO_LOAD: string[] = [];

export default function AboutPage() {
  useIntroRegistry(ASSETS_TO_LOAD);
  const { setPageReady } = useIntro();
  const pathname = usePathname(); // <-- NEW: Get the current route

  useEffect(() => {
    // 1. Force the page to lock down when navigating internally
    setPageReady(false);
    window.scrollTo(0, 0);

    // 2. Erase any ghost GSAP triggers left behind by Next.js soft-routing
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const timer = setTimeout(() => {
      setPageReady(true);
      
      // 3. Re-calculate the GSAP math only AFTER the layout is fully unlocked
      requestAnimationFrame(() => {
        setTimeout(() => ScrollTrigger.refresh(), 150);
        setTimeout(() => ScrollTrigger.refresh(), 500);
      });
      
    }, 3000); 

    return () => {
      clearTimeout(timer);
      // Cleanup on exit so triggers don't break other pages
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); 
    };
  }, [setPageReady, pathname]); // <-- NEW: Re-run whenever the path changes

  return (
    <main className="w-full min-h-screen bg-[#F3F0E7] text-[#1A1A1A] relative selection:bg-[#1A1A1A] selection:text-[#F3F0E7] overflow-x-hidden">
      
      {/* 1. The Floating Cinematic Header */}
      <CinematicHeader />

      {/* 2. The Interactive Scroll Experience */}
      <HorizontalScroll />

      {/* 3. The Editorial Press Section (Vintage Magazine Style) */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto py-16 md:py-32 border-t-2 border-[#1A1A1A]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 lg:gap-24">
          
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/50 mb-3 md:mb-4">
              In The Press
            </h2>
            <h3 
              className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-6 md:mb-8 leading-none" 
              style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
            >
              Broadsheet<br />Feature
            </h3>
            <a 
              href="https://www.broadsheet.com.au/melbourne/clifton-hill/cafes/uncle-drew-cafe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest text-[#8B3A2B] hover:text-[#1A1A1A] transition-colors duration-300"
            >
              <span>Read Original</span>
              <span className="w-6 md:w-8 h-[2px] bg-[#8B3A2B] group-hover:bg-[#1A1A1A] transition-colors duration-300" />
            </a>
          </div>

          <div className="text-[15px] md:text-[17px] leading-[1.8] text-[#1A1A1A]/80 font-medium md:columns-2 gap-12 space-y-6">
            
            <p className="first-letter:text-6xl md:first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 md:first-letter:mr-4 first-letter:mt-1 md:first-letter:mt-2 first-letter:leading-none first-letter:text-[#8B3A2B] first-letter:font-serif">
              In the quiet backstreets of Clifton Hill, you’ll find owner Jonathon Scali on the coffee machine at Uncle Drew Cafe. The name is a nod to the fella who taught him how to make his first coffee in the early ‘00s.
            </p>
            
            <p>
              Today Scali serves up Dukes coffee to local residents, office workers, and those taking a pitstop along the Merri Creek Trail. Meanwhile, his co-owner Karel Simek works his magic in the kitchen. Istra Smallgoods bacon, Tivoli Road Bakery bread and Rooftop Honey all feature on his tight, sophisticated menu.
            </p>
            
            <p>
              For eating, a smart choice might be the breakfast burrito, which brims with chilli and pesto frittata, potato hash, minced pork, beans and more. Uncle Drew’s toastie is a crowd favourite at any time of day – shaved ham, spicy pulled pork, manchego, pickles, Dijon mustard and crème fraiche. 
            </p>

            <p>
              Filled bagels, baguettes, homemade pies, cakes and slices are available for a quick takeaway option. Lunch-time dishes have included anything from a soba noodle salad with salmon, edamame and ponzu dressing, to a house made potato gnocchi with tomato, basil and mozzarella. Soft drinks are by Karma Kola and chai is made in-house.
            </p>
            
            <p>
              There’s also a deli with fridge snacks, dry goods and seasonal produce for you to take home. You might find local honey, small-batch coffee beans, or European condiments from ajvar (roasted red pepper dip) to Genoan pesto.
            </p>
            
            <p>
              The space itself is bright and clean, with a hint of lived-in charm. The counter is made of timber recycled from the floor of a Victorian woolshed, and the same appears in the handmade tables in the dining area.
            </p>
          </div>

        </div>
      </section>

      {/* 4. The Footer */}
      <CinematicFooter />

    </main>
  );
}