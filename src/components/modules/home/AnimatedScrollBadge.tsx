'use client';

import React from 'react';

export default function AnimatedScrollBadge() {
  return (
    // Added 'hidden md:flex' to completely remove this from mobile screens
    <div className="hidden md:flex flex-col items-center justify-end h-48 z-30 pointer-events-none">
      
      <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#1A1A1A]/50 mb-3 ml-[0.4em]">
        Scroll
      </span>

      <div className="relative flex items-center justify-center z-10 mb-[-2px]">
        <div className="w-9 h-9 rounded-full border border-[#1A1A1A]/30 flex items-center justify-center animate-pulse bg-[#F3F0E7]">
          <svg 
            width="10" 
            height="14" 
            viewBox="0 0 12 16" 
            fill="none" 
            className="text-[#1A1A1A] mt-[1px]"
          >
            <path d="M6 1V14M6 14L1 9M6 14L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="w-[1px] h-16 bg-gradient-to-b from-[#1A1A1A]/20 to-transparent"></div>
      
    </div>
  );
}