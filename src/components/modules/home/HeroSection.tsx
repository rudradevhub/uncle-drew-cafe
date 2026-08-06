'use client';

import React, { useEffect, useState } from 'react';
import AnimatedScrollBadge from '@/components/modules/home/AnimatedScrollBadge';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // Adjusted padding: px-4 on mobile, md:px-12 on tablet/desktop
    <section className="relative w-full h-screen flex flex-col items-center justify-center px-4 md:px-12 bg-[#F3F0E7] z-20 overflow-hidden">
      
      <style dangerouslySetInnerHTML={{ __html: `
        .reveal-text {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-text.loaded {
          opacity: 1;
          transform: translateY(0);
        }
      `}} />

      <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto text-center z-10">
        
        <div className={`reveal-text flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8 w-full ${mounted ? 'loaded' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <div className="w-6 md:w-16 h-[1px] bg-[#1A1A1A]/30"></div>
          <span className="text-[9px] md:text-xs font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#1A1A1A]/60 whitespace-nowrap">
            A Clifton Hill Institution
          </span>
          <div className="w-6 md:w-16 h-[1px] bg-[#1A1A1A]/30"></div>
        </div>

        {/* Scaled text: text-5xl for mobile, 7xl for tablet, 8.5rem for desktop */}
        <h1 
          className={`reveal-text text-5xl md:text-7xl lg:text-[8.5rem] font-bold uppercase tracking-wider text-[#1A1A1A] leading-[1.05] md:leading-[1.05] ${mounted ? 'loaded' : ''}`}
          style={{ fontFamily: 'var(--font-heading, sans-serif)', transitionDelay: '0.4s' }}
        >
          Come for the coffee. <br />
          <span className="text-[#8B3A2B]">Stay for the stories.</span>
        </h1>
        
      </div>

      <div 
        className={`reveal-text absolute bottom-0 left-6 md:left-12 pointer-events-none ${mounted ? 'loaded' : ''}`} 
        style={{ transitionDelay: '0.8s' }}
      >
        <div className="pointer-events-auto h-full">
          <AnimatedScrollBadge />
        </div>
      </div>

    </section>
  );
}