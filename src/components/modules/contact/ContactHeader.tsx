'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ContactHeader() {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      '.contact-title-anim',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
    )
    .fromTo(
      '.contact-divider',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, transformOrigin: 'left center' },
      '-=0.4'
    );
  }, { scope: headerRef });

  return (
    <div ref={headerRef} className="pt-24 pb-16 px-6 md:px-16 max-w-7xl mx-auto">
      <h1 
        className="contact-title-anim text-5xl md:text-7xl font-bold uppercase tracking-wider text-[#1A1A1A] mb-4"
        style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
      >
        Contact Uncle Drew
      </h1>
      <p className="contact-title-anim text-lg md:text-xl text-[#1A1A1A]/70 italic mb-8">
        "We'd love to hear from you."
      </p>
      <div className="contact-divider w-full h-[2px] bg-[#1A1A1A]/20" />
    </div>
  );
}