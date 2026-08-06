'use client';

import React from 'react';

interface ControlsProps {
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
}

export default function Controls({
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
}: ControlsProps) {
  return (
    <div className="flex items-center gap-8 z-40 pointer-events-auto">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className={`px-8 py-3 rounded-full border border-[#1A1A1A] text-sm font-bold uppercase tracking-widest transition-all ${
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
        className={`px-8 py-3 rounded-full border border-[#1A1A1A] text-sm font-bold uppercase tracking-widest transition-all ${
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