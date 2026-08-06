'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useIntroRegistry } from '@/hooks/useIntroRegistry';
import { useIntro } from '@/contexts/IntroContext';

const NOT_FOUND_IMAGES = [
  '/404/2.jpg',
  '/404/3.jpg',
  '/404/4.jpg',
  '/404/5.jpg',
  '/404/6.jpg',
  '/404/7.jpg'
];

export default function NotFoundPage() {
  useIntroRegistry(NOT_FOUND_IMAGES);

  const { setPageReady } = useIntro();
  const [currentIndex, setCurrentIndex] = useState(0);

  // FIX: Added a timeout to prevent the race condition. 
  // This guarantees the loading screen has time to mount before we drop it.
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 500); 
    return () => clearTimeout(timer);
  }, [setPageReady]);

  // The Fast Stop-Motion Animation Engine (~5fps snap loop)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const playNextFrame = () => {
      const nextDelay = 350; 

      timeoutId = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % NOT_FOUND_IMAGES.length);
        playNextFrame();
      }, nextDelay);
    };

    playNextFrame();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#1A1A1A] select-none">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ken-burns {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.015); }
        }
        .animate-ken-burns {
          animation: ken-burns 16s ease-in-out infinite;
        }
        
        .paper-ticket {
          background-color: #F7F4EC;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
        }
        
        .masking-tape {
          background-color: rgba(232, 228, 217, 0.85);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          mix-blend-mode: multiply;
        }
      `}} />

      <div className="absolute inset-0 animate-ken-burns">
        {NOT_FOUND_IMAGES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-50 group flex flex-col items-center">
        
        <div 
          className="masking-tape absolute -top-3 w-16 h-5 rotate-[-3deg] z-20 backdrop-blur-[2px] transition-transform duration-300 ease-out group-hover:-translate-y-[1px]"
          aria-hidden="true"
        />

        {/* FIX: Ensure href is exactly "/" and not "/home" */}
        <Link 
          href="/"
          aria-label="Return to homepage"
          className="
            paper-ticket relative block px-10 py-3.5 z-10
            border border-[#D1C8B8] rounded-[4px]
            text-[#1A1A1A] font-semibold text-[15px] uppercase tracking-[0.18em]
            shadow-[0_8px_18px_rgba(0,0,0,0.12),inset_1px_1px_0_rgba(255,255,255,0.4)]
            transition-all duration-300 ease-out
            hover:bg-[#F0EAE0] hover:-translate-y-[2px]
            hover:shadow-[0_12px_24px_rgba(0,0,0,0.15),inset_1px_1px_0_rgba(255,255,255,0.5)]
            active:translate-y-[1px]
            active:shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_1px_1px_0_rgba(255,255,255,0.2)]
            focus:outline-none focus:ring-2 focus:ring-[#F3F0E7] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]
          "
          style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
        >
          <span className="flex items-center gap-2">
            RETRY 
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-[3px]">
              &rarr;
            </span>
          </span>
        </Link>
      </div>

    </main>
  );
}