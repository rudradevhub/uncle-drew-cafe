'use client';

import React from 'react';

export default function InteractiveMapCard() {
  return (
    <div className="relative w-full h-[600px] md:h-full min-h-[500px] group cursor-pointer perspective-1000">
      
      {/* 1. Base Layer: The Colorful Google Map */}
      <div className="absolute inset-0 z-0 border-2 border-[#1A1A1A] bg-[#EFEADF] overflow-hidden">
        <iframe 
          src="https://maps.google.com/maps?q=Uncle%20Drew%20Cafe,%2023%20Groom%20St,%20Clifton%20Hill,%20VIC,%20Australia&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} // Removed grayscale filter
          allowFullScreen={false} 
          loading="lazy"
          title="Uncle Drew Cafe Location"
        />
        
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] pointer-events-none" />
      </div>

      {/* 2. Top Layer: The Taped Illustration */}
      <div 
        className="
          absolute inset-0 z-10 bg-[#FDE4C3] border-2 border-[#1A1A1A] 
          flex flex-col items-center justify-center
          transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]
          group-hover:-translate-y-[105%] group-hover:rotate-2 group-hover:shadow-2xl
          origin-bottom
        "
      >
        <div 
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 rotate-[-2deg] z-20 backdrop-blur-[2px]"
          style={{
            backgroundColor: 'rgba(232, 228, 217, 0.9)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            mixBlendMode: 'multiply'
          }}
        />

        <div className="relative w-[80%] max-w-[400px] p-3 border border-[#1A1A1A]/20 bg-[#F7F2E8] shadow-sm">
          <img 
            src="/contact/building.png" 
            alt="Uncle Drew Cafe Illustration"
            className="w-full h-auto object-cover border border-[#1A1A1A]/10"
          />
        </div>
        
        <p className="absolute bottom-6 text-xs font-bold tracking-[0.2em] uppercase opacity-50">
          Hover to view map
        </p>
      </div>

    </div>
  );
}