'use client';

import React from 'react';
import Link from 'next/link';

export default function VisitSection() {
  return (
    // FIX: Reduced padding from py-32 to py-20 for mobile
    <section className="w-full py-20 md:py-32 px-6 md:px-12 bg-[#F3F0E7]">
      {/* FIX: Reduced inner padding and gap for mobile */}
      <div className="max-w-5xl mx-auto border-t border-b border-[#1A1A1A]/20 py-16 md:py-24 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16">
        
        <div className="w-full md:w-1/2">
          <h2 
            // FIX: Scaled text-4xl down to 3xl for mobile
            className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-[#1A1A1A] mb-6 md:mb-8"
            style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            A place for the <br/>neighborhood.
          </h2>
          <p className="text-sm md:text-lg font-medium leading-relaxed text-[#1A1A1A]/80 max-w-sm mb-10 md:mb-12">
            Whether you are here for a quick morning espresso or a long afternoon with friends, there is a seat waiting for you.
          </p>
          <Link 
            href="/contact"
            className="
              relative inline-block px-8 py-3 md:px-10 md:py-3.5
              bg-[#F7F4EC] border border-[#D1C8B8] rounded-[4px]
              text-[#1A1A1A] font-semibold text-[12px] md:text-[15px] uppercase tracking-[0.18em]
              shadow-[0_8px_18px_rgba(0,0,0,0.12),inset_1px_1px_0_rgba(255,255,255,0.4)]
              transition-all duration-300 ease-out
              hover:bg-[#F0EAE0] hover:-translate-y-[2px]
              hover:shadow-[0_12px_24px_rgba(0,0,0,0.15),inset_1px_1px_0_rgba(255,255,255,0.5)]
            "
            style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            Find Your Seat &rarr;
          </Link>
        </div>

        {/* FIX: Reduced gap between location and hours for mobile */}
        <div className="w-full md:w-1/3 flex flex-col gap-8 md:gap-12">
          <div>
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-50 mb-2 md:mb-3 font-mono">Location</h3>
            <p className="text-base md:text-lg font-medium leading-relaxed text-[#1A1A1A]">
              23 Groom St<br />
              Clifton Hill VIC 3068<br />
              Australia
            </p>
          </div>
          <div>
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-50 mb-2 md:mb-3 font-mono">Hours</h3>
            <p className="text-base md:text-lg font-medium leading-relaxed text-[#1A1A1A]">
              Mon – Fri: 07:00 – 18:00<br />
              Sat – Sun: 08:00 – 17:00
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}