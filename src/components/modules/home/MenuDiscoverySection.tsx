'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FEATURED_MENU } from '@/data/featuredMenu';

export default function MenuDiscoverySection() {
  const [activeCategoryId, setActiveCategoryId] = useState(FEATURED_MENU[0].categoryId);
  const [animationState, setAnimationState] = useState<'in' | 'out' | 'entering'>('in');

  const activeCategory = FEATURED_MENU.find(c => c.categoryId === activeCategoryId) || FEATURED_MENU[0];

  const handleTabClick = (id: string) => {
    if (id === activeCategoryId || animationState !== 'in') return;
    
    setAnimationState('out');
    
    setTimeout(() => {
      setActiveCategoryId(id);
      setAnimationState('entering');
      
      setTimeout(() => {
        setAnimationState('in');
      }, 50); 
      
    }, 400); 
  };

  let showcaseAnimationClasses = "";
  if (animationState === 'out') {
    showcaseAnimationClasses = "transition-all duration-400 ease-in opacity-0 -translate-y-6";
  } else if (animationState === 'entering') {
    showcaseAnimationClasses = "opacity-0 translate-y-6";
  } else if (animationState === 'in') {
    showcaseAnimationClasses = "transition-all duration-500 ease-out opacity-100 translate-y-0";
  }

  return (
    <section id="featured-menu" className="relative w-full py-32 px-6 md:px-12 max-w-7xl mx-auto bg-[#F3F0E7] z-20">
      
      {/* 1. SECTION HEADING */}
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest text-[#1A1A1A] mb-4"
          style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
        >
          Featured Favourites
        </h2>
        <p className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/50">
          A curated selection of some of our favourite dishes & coffee
        </p>
      </div>

     {/* 2. CATEGORY CHIPS NAVIGATION */}
      <div className="w-full mb-12 md:mb-20 -mx-6 px-6 md:mx-0 md:px-0">
        {/* Hide scrollbar trick inline to avoid needing to edit global CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
        
        <div className="flex flex-row md:flex-wrap items-center justify-start md:justify-center gap-3 md:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 md:pb-0">
          {FEATURED_MENU.map((cat) => (
            <button
              key={cat.categoryId}
              onClick={() => handleTabClick(cat.categoryId)}
              className={`
                shrink-0 snap-start px-5 md:px-6 py-2.5 rounded-[3px] text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 border
                ${activeCategoryId === cat.categoryId 
                  ? 'bg-[#1A1A1A] text-[#F3F0E7] border-[#1A1A1A] shadow-[0_4px_12px_rgba(0,0,0,0.15)]' 
                  : 'bg-transparent text-[#1A1A1A]/70 border-[#1A1A1A]/20 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/50'
                }
              `}
            >
              {cat.categoryLabel}
            </button>
          ))}
        </div>
      </div>

      {/* 3. FEATURED PRODUCTS SHOWCASE */}
      <div className={`flex flex-wrap justify-center gap-8 md:gap-12 w-full ${showcaseAnimationClasses}`}>
        {activeCategory.items.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col group cursor-default w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[320px]"
          >
            
            {/* Image Container */}
            <div className="w-full aspect-[4/5] bg-[#EAE6D8] border border-[#1A1A1A]/10 relative overflow-hidden mb-6">
              
              {/* Fallback dotted border for dev */}
              <div className="absolute inset-4 border border-[#1A1A1A]/5 border-dashed flex flex-col items-center justify-center z-0">
                 <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/30 mb-2">No Photo</span>
                 <span className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/40 text-center px-2" style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
                   {item.title}
                 </span>
              </div>
              
              {/* Actual Optimized Image */}
              <div className="absolute inset-0 z-10">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Typography */}
            <h3 
              className="text-lg md:text-xl font-bold uppercase tracking-wider text-[#1A1A1A] leading-tight mb-2 transition-colors duration-300 group-hover:text-[#8B3A2B]"
              style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
            >
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] text-[#1A1A1A]/50">
                {item.subtitle}
              </p>
            )}
            
          </div>
        ))}
      </div>

      {/* 4. CALL TO ACTION */}
      <div className="mt-24 text-center border-t border-[#1A1A1A]/10 pt-16 flex flex-col items-center">
        <p className="text-sm font-medium tracking-wide text-[#1A1A1A]/80 mb-8">
          Explore Our Full Menu
        </p>
        <Link 
          href="/menu"
          className="
            relative inline-flex items-center justify-center px-10 py-3.5
            bg-[#F7F4EC] border border-[#D1C8B8] rounded-[4px]
            text-[#1A1A1A] font-semibold text-[13px] uppercase tracking-[0.2em]
            shadow-[0_8px_18px_rgba(0,0,0,0.12),inset_1px_1px_0_rgba(255,255,255,0.4)]
            transition-all duration-300 ease-out
            hover:bg-[#F0EAE0] hover:-translate-y-[2px]
            hover:shadow-[0_12px_24px_rgba(0,0,0,0.15),inset_1px_1px_0_rgba(255,255,255,0.5)]
            active:translate-y-[1px]
          "
        >
          Menu &rarr;
        </Link>
      </div>

    </section>
  );
}