'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TILES = [
  '/about/wwww 1.png',
  '/about/wwww 2.png',
  '/about/wwww 3.png',
  '/about/wwww 4.png',
];

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#F3F0E7]">
      <div className="absolute top-8 left-8 z-50 mix-blend-difference pointer-events-auto">
        <Link href="/" className="text-white font-bold uppercase tracking-widest text-lg font-mono hover:opacity-70">
          ← Back Home
        </Link>
      </div>
      <div ref={trackRef} className="flex h-full w-max">
        {TILES.map((src, i) => (
          <div key={i} className="relative h-screen flex-shrink-0">
            <img
              src={src}
              alt={`Part ${i + 1}`}
              className="h-full w-auto object-contain block select-none"
              style={{ marginLeft: i > 0 ? '-1px' : '0' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}