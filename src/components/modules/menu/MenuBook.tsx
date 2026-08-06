'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MenuPage from './MenuPage';

interface MenuBookProps {
  currentPage: number;
}

const SPREAD_IMAGES = Array.from({ length: 17 }, (_, i) => 
  `/menu-pages/page-${(i).toString().padStart(2, '0')}.jpg`
);

const PHYSICAL_SHEETS = SPREAD_IMAGES.map((spreadUrl, index) => ({
  frontImage: spreadUrl,
  backImage: SPREAD_IMAGES[index + 1] || null 
}));

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
        // MILESTONE 9: Soft luxury drop shadow lifting the book off the background
        boxShadow: '0 25px 60px -15px rgba(26, 26, 26, 0.18), 0 0 25px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div className="absolute top-0 right-0 w-1/2 h-full">
        
        {PHYSICAL_SHEETS.map((sheet, index) => {
          const reverseIndex = PHYSICAL_SHEETS.length - 1 - index;
          const currentSheet = PHYSICAL_SHEETS[reverseIndex];

          return (
            <MenuPage 
              key={`sheet-${reverseIndex}`}
              ref={(el) => { pagesRef.current[reverseIndex] = el; }}
              zIndex={100 - reverseIndex} 
              frontContent={
                <div 
                  className="w-full h-full bg-[#FDFBF7] bg-no-repeat relative overflow-hidden"
                  style={{ 
                    backgroundImage: `url('${currentSheet.frontImage}')`, 
                    backgroundPosition: 'right center', 
                    backgroundSize: '200% 100%' 
                  }}
                >
                  {/* MILESTONE 9: Spine gutter shadow on the left edge of the front page */}
                  <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                </div>
              } 
              backContent={
                currentSheet.backImage ? (
                  <div 
                    className="w-full h-full bg-[#FDFBF7] bg-no-repeat relative overflow-hidden"
                    style={{ 
                      backgroundImage: `url('${currentSheet.backImage}')`, 
                      backgroundPosition: 'left center', 
                      backgroundSize: '200% 100%' 
                    }}
                  >
                    {/* MILESTONE 9: Spine gutter shadow on the right edge of the back page */}
                    <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
                  </div>
                ) : (
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