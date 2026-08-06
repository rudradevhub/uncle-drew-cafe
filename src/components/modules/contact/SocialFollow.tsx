'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Array containing exact links and pure SVG icons
const SOCIAL_LINKS = [
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/explore/tags/uncledrewcafe/',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  { 
    name: 'Facebook', 
    url: 'https://www.facebook.com/uncledrewcafe/?fref=ts',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    )
  },
  { 
    name: 'Google Maps', 
    url: 'https://www.google.com/maps/place/uncle+drew+cafe/data=!4m2!3m1!1s0x6ad6430f1f9794eb:0x79ebc9daebfdf339?sa=X&ved=1t:242&ictx=111',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    )
  },
  { 
    name: 'Email', 
    url: 'mailto:e-uncledrewcafe@gmail.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    )
  },
];

export default function SocialFollow() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%', 
      }
    });

    tl.fromTo(
      '.social-heading',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      '.social-link-item',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
      '-=0.4'
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-24 border-t border-[#1A1A1A]/20">
      <h2 
        className="social-heading text-4xl md:text-5xl font-bold uppercase tracking-widest mb-16 text-center"
        style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
      >
        Follow the Vibe
      </h2>
      
      {/* 2. Responsive Grid/Flex layout for the links */}
      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-10 md:gap-16">
        {SOCIAL_LINKS.map((link) => (
          <Link 
            key={link.name} 
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-item group relative flex items-center gap-3 text-lg md:text-xl font-medium uppercase tracking-wider overflow-hidden pb-1"
          >
            {/* The SVG Icon */}
            <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              {link.icon}
            </span>
            
            {/* The Text label */}
            <span>{link.name}</span>
            
            {/* The Arrow */}
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-1 opacity-50 group-hover:opacity-100 text-sm">
              ↗
            </span>
            
            {/* Animated Underline */}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#8B3A2B] transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
        ))}
      </div>
    </div>
  );
}