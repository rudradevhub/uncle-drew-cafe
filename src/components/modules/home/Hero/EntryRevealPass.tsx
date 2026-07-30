'use client';

import React, { useRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { ResolutionEffect } from './effects/ResolutionEffect';

interface EntryRevealPassProps {
  progress: number;
}

// Wrap class for R3F
const ResolutionEffectPrimitive = React.forwardRef<ResolutionEffect, any>((props, ref) => {
  const effect = React.useMemo(() => new ResolutionEffect(props), [props]);
  useImperativeHandle(ref, () => effect, [effect]);
  return <primitive object={effect} dispose={null} />;
});
ResolutionEffectPrimitive.displayName = 'ResolutionEffectPrimitive';

export default function EntryRevealPass({ progress }: EntryRevealPassProps) {
  const effectRef = useRef<ResolutionEffect>(null);

  // CONFIG
  const ENTRY_CUTOFF = 0.35; 
  const BASE_PIXEL_COUNT = 80.0;

  useFrame(() => {
    if (!effectRef.current) return;

    let revealFactor = 0;
    if (progress < ENTRY_CUTOFF) {
      revealFactor = progress / ENTRY_CUTOFF;
    } else {
      revealFactor = 1.0;
    }

    revealFactor = Math.max(0, Math.min(1, revealFactor));
    effectRef.current.updateProgress(revealFactor);
  });

  return (
    <EffectComposer enabled={true} disableNormalPass={false} depthBuffer={true} multisampling={0}>
      <ResolutionEffectPrimitive ref={effectRef} pixelSize={BASE_PIXEL_COUNT} />
    </EffectComposer>
  );
}