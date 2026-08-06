'use client';

import React from 'react';

export default function ContactFooter() {
  return (
    <div className="pb-32 pt-12 flex flex-col items-center justify-center text-center">
      {/* Decorative Coffee Element (SVG) */}
      <div className="mb-8 opacity-60">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>
      </div>
      
      <h2 
        className="text-6xl md:text-[8rem] leading-none font-bold uppercase tracking-widest text-[#1A1A1A]"
        style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
      >
        See You<br/>Soon.
      </h2>
    </div>
  );
}