'use client';

import { EffectComposer, Pixelation, Noise } from '@react-three/postprocessing';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

type EntryEffectProps = {
  progress: number;
};

export default function EntryEffect({ progress }: EntryEffectProps) {
  const pixelRef = useRef<any>(null);
  const noiseRef = useRef<any>(null);

  // CONFIGURATION
  const ENTRY_CUTOFF = 0.35; 
  const MAX_PIXEL_SIZE = 12; 
  const MAX_NOISE = 0.15;   

  useFrame(() => {
    // Safety check
    if (!pixelRef.current || !noiseRef.current) return;

    let entryFactor = 0;
    if (progress < ENTRY_CUTOFF) {
      entryFactor = 1 - (progress / ENTRY_CUTOFF);
    }
    
    // Clamp between 0 and 1
    entryFactor = Math.max(0, Math.min(1, entryFactor));

    // UPDATE: We leave granularity at 0 when finished.
    // If the shader creates artifacts at 0, we can clamp it to 0.001,
    // but usually 0 is fine for this library.
    if (entryFactor <= 0.001) {
       pixelRef.current.granularity = 0;
       noiseRef.current.opacity = 0;
    } else {
       pixelRef.current.granularity = entryFactor * MAX_PIXEL_SIZE;
       noiseRef.current.opacity = entryFactor * MAX_NOISE;
    }
  });

  return (
    // CRITICAL FIX: multisampling={0}
    // This prevents the "reading 'length' of undefined" crash
    // by disabling the MSAA buffer logic that conflicts with pixelation.
    <EffectComposer multisampling={0}>
      <Pixelation
        ref={pixelRef}
        granularity={MAX_PIXEL_SIZE}
      />
      <Noise
        ref={noiseRef}
        opacity={MAX_NOISE}
      />
    </EffectComposer>
  );
}