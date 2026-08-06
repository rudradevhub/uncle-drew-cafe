'use client';

import React, { forwardRef } from 'react';

interface MenuPageProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  zIndex: number;
}

const MenuPage = forwardRef<HTMLDivElement, MenuPageProps>(
  ({ frontContent, backContent, zIndex }, ref) => {
    return (
      <div 
        ref={ref}
        className="absolute top-0 left-0 w-full h-full origin-left"
        style={{ 
          zIndex, 
          transformStyle: 'preserve-3d',
          transform: 'rotateY(0deg)', // All pages start face-up on the right
        }}
      >
        {/* FRONT FACE */}
        <div 
          className="absolute inset-0 bg-[#FDFBF7] shadow-[-4px_0_15px_rgba(0,0,0,0.05)] border-r border-[#1A1A1A]/5 overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent}
        </div>

        {/* BACK FACE */}
        <div 
          className="absolute inset-0 bg-[#FDFBF7] shadow-[4px_0_15px_rgba(0,0,0,0.05)] border-l border-[#1A1A1A]/5 overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' 
          }}
        >
          {backContent}
        </div>
      </div>
    );
  }
);

MenuPage.displayName = 'MenuPage';
export default MenuPage;