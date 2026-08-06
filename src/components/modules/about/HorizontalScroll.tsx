'use client';

import { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // <-- NEW: Detects soft routing
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useIntroRegistry } from '@/hooks/useIntroRegistry';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TILES = [
  '/about/wwww 1.webp',
  '/about/wwww 2.webp',
  '/about/wwww 3.webp',
  '/about/wwww 4.webp',
];

export default function HorizontalScroll() {
  useIntroRegistry(TILES);
  
  const pathname = usePathname(); // <-- NEW: Tracks URL changes
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [isHidden, setIsHidden] = useState(false);
  const [isReady, setIsReady] = useState(false); // <-- NEW: Stops GSAP from calculating too early
  const lastYRef = useRef(0);

  // --- NEW: Sync GSAP initialization with your 3-second Intro Loader ---
  useEffect(() => {
    setIsReady(false); // Lock it down on navigation
    
    // Wait exactly 3 seconds for the loader, plus 100ms for the DOM to paint
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3100);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Header scroll tracking logic
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop;

      if (currentY > lastYRef.current && currentY > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false); 
      }
      
      lastYRef.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // --- THE FIX: Do absolutely nothing until the page is fully ready ---
    if (!isReady) return;

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const getScrollAmount = () => {
      let trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth);
    };

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });
  }, { scope: containerRef, dependencies: [isReady] }); // <-- THE FIX: Re-run GSAP when isReady flips to true

  return (
    <div ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-[#F3F0E7]">
      
      <div 
        className={`fixed top-6 left-6 md:top-8 md:left-8 z-[100] mix-blend-difference pointer-events-auto transition-all duration-500 ease-out ${
          isHidden ? '-translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <Link href="/" className="text-white font-bold uppercase tracking-widest text-sm md:text-lg font-mono hover:opacity-70">
          ← Back Home
        </Link>
      </div>

      <div ref={trackRef} className="flex h-full w-max">
        {TILES.map((src, i) => (
          <div key={i} className="relative h-[100dvh] flex-shrink-0">
            <img
              src={src}
              alt={`Part ${i + 1}`}
              className="h-full w-auto max-w-none object-cover md:object-contain block select-none"
              style={{ marginLeft: i > 0 ? '-1px' : '0' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}