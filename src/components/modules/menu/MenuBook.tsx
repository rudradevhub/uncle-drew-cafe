'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MenuPage from './MenuPage';

interface MenuBookProps {
  currentPage: number;
}

// Exactly 16 images (page-01.jpg to page-16.jpg)
const SPREAD_IMAGES = Array.from({ length: 16 }, (_, i) => 
  `/menu-pages/page-${(i + 1).toString().padStart(2, '0')}.jpg`
);

// We need 17 physical sheets for 1 Cover + 16 Spreads
const PHYSICAL_SHEETS = Array.from({ length: 17 }, (_, index) => {
  if (index === 0) {
    // Sheet 0: Custom Code Cover on Front, Left-half of Image 1 on Back
    return { isCover: true, frontImage: null, backImage: SPREAD_IMAGES[0] };
  }
  // Sheets 1-16: Right-half of previous image on Front, Left-half of next image on Back
  return {
    isCover: false,
    frontImage: SPREAD_IMAGES[index - 1],
    backImage: SPREAD_IMAGES[index] || null 
  };
});

export default function MenuBook({ currentPage }: MenuBookProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const previousPageRef = useRef(currentPage);

  useGSAP(() => {
    const prev = previousPageRef.current;
    const current = currentPage;
    if (prev === current) return;

    const isForward = current > prev;
    const tl = gsap.timeline();
    
    const pagesToAnimate: number[] = [];
    if (isForward) {
      for (let i = prev; i < current; i++) pagesToAnimate.push(i);
    } else {
      for (let i = prev - 1; i >= current; i--) pagesToAnimate.push(i);
    }

    const baseDuration = pagesToAnimate.length > 1 ? 0.5 : 1.2;
    const stagger = pagesToAnimate.length > 1 ? 0.15 : 0;

    pagesToAnimate.forEach((index, i) => {
      const target = pagesRef.current[index];
      if (!target) return;
      
      const startTime = i * stagger;
      
      if (isForward) {
        tl.to(target, { rotateY: -180, duration: baseDuration, ease: "power2.inOut" }, startTime);
        tl.set(target, { zIndex: index }, startTime + (baseDuration / 2));
      } else {
        tl.set(target, { zIndex: 100 - index }, startTime);
        tl.to(target, { rotateY: 0, duration: baseDuration, ease: "power2.inOut" }, startTime);
      }
    });

    previousPageRef.current = current;
  }, [currentPage]);

  return (
    <div 
      ref={containerRef}
      className="relative max-w-full mx-auto mt-4"
      style={{ 
        height: '78vh', 
        aspectRatio: '16 / 9', 
        perspective: '3500px',
        boxShadow: '0 25px 60px -15px rgba(26, 26, 26, 0.18), 0 0 25px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div className="absolute top-0 right-0 w-1/2 h-full">
        
        {PHYSICAL_SHEETS.map((currentSheet, index) => {
          const reverseIndex = PHYSICAL_SHEETS.length - 1 - index;
          const mappedSheet = PHYSICAL_SHEETS[reverseIndex];

          return (
            <MenuPage 
              key={`sheet-${reverseIndex}`}
              ref={(el) => { pagesRef.current[reverseIndex] = el; }}
              zIndex={100 - reverseIndex} 
              frontContent={
                mappedSheet.isCover ? (
                  // --- THE CUSTOM CODED COVER ---
                  <div className="w-full h-full bg-[#FDFBF7] relative flex items-center justify-center overflow-hidden">
                    <div className="absolute left-6 inset-y-0 flex items-center justify-center">
                      <h1 className="text-[#E05D25] font-black text-8xl md:text-[110px] -rotate-90 tracking-tighter uppercase leading-none opacity-90">
                        MENU
                      </h1>
                    </div>
                    <div className="flex flex-col items-center justify-center z-10 ml-20">
                      <h2 className="text-[#1A1A1A] font-bold text-5xl md:text-6xl tracking-widest uppercase text-center leading-tight" style={{ fontFamily: 'var(--font-heading, monospace)' }}>
                        Uncle<br/>Drew
                      </h2>
                    </div>
                    <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  // --- THE RIGHT HALF OF IMAGES ---
                  <div 
                    className="w-full h-full bg-[#FDFBF7] bg-no-repeat relative overflow-hidden"
                    style={{ 
                      backgroundImage: `url('${mappedSheet.frontImage}')`, 
                      backgroundPosition: 'right center', 
                      backgroundSize: '200% 100%' 
                    }}
                  >
                    <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                  </div>
                )
              } 
              backContent={
                mappedSheet.backImage ? (
                  // --- THE LEFT HALF OF IMAGES ---
                  <div 
                    className="w-full h-full bg-[#FDFBF7] bg-no-repeat relative overflow-hidden"
                    style={{ 
                      backgroundImage: `url('${mappedSheet.backImage}')`, 
                      backgroundPosition: 'left center', 
                      backgroundSize: '200% 100%' 
                    }}
                  >
                    <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  // --- THE BLANK BACK COVER ---
                  <div className="w-full h-full bg-[#FDFBF7] relative overflow-hidden" /> 
                )
              } 
            />
          );
        })}

      </div>
    </div>
  );
}