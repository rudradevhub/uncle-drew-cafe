'use client';

import React from 'react';

interface ControlsProps {
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  size?: 'normal' | 'small';
}

export default function Controls({
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
  size = 'normal',
}: ControlsProps) {
  const isSmall = size === 'small';

  return (
    <div className="flex items-center gap-4 md:gap-8 z-40 pointer-events-auto">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className={`rounded-full border border-[#1A1A1A] font-bold uppercase tracking-widest transition-all ${
          isSmall ? 'px-5 py-2 text-xs' : 'px-8 py-3 text-sm'
        } ${
          canPrev
            ? 'bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F3F0E7] active:scale-95'
            : 'opacity-30 border-opacity-30 cursor-not-allowed'
        }`}
        style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
      >
        ← Prev
      </button>

      <button
        onClick={onNext}
        disabled={!canNext}
        className={`rounded-full border border-[#1A1A1A] font-bold uppercase tracking-widest transition-all ${
          isSmall ? 'px-5 py-2 text-xs' : 'px-8 py-3 text-sm'
        } ${
          canNext
            ? 'bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F3F0E7] active:scale-95'
            : 'opacity-30 border-opacity-30 cursor-not-allowed'
        }`}
        style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
      >
        Next →
      </button>
    </div>
  );
}