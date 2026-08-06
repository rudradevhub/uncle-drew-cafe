'use client';

import React, { useState, useEffect } from 'react';

export default function SkipButton() {
  const [isPastAnimation, setIsPastAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1200) {
        setIsPastAnimation(true);
      } else {
        setIsPastAnimation(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isPastAnimation) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const menuSection = document.getElementById('featured-menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="
        fixed bottom-6 right-4 md:bottom-8 md:right-8 z-40 flex items-center justify-center 
        px-4 py-2.5 md:px-6 md:py-3 rounded-full bg-[#F7F4EC]/90 backdrop-blur-md 
        border border-[#D1C8B8]/60 text-[#1A1A1A] font-bold text-[9px] md:text-[11px] 
        uppercase tracking-[0.2em] shadow-[0_4px_16px_rgba(0,0,0,0.08)] 
        transition-all duration-300 ease-out
        hover:bg-[#F0EAE0] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]
      "
    >
      {isPastAnimation ? 'Back To Top ↑' : 'Skip Intro ↓'}
    </button>
  );
}