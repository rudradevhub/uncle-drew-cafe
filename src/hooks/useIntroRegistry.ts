'use client';

import { useEffect } from 'react';
import { useIntro } from '@/contexts/IntroContext';

export function useIntroRegistry(assetUrls: string[] = []) {
  const { setPageReady } = useIntro();

  useEffect(() => {
    // If a page requires no special assets, mark it ready immediately
    if (assetUrls.length === 0) {
      setPageReady(true);
      return;
    }

    let isCancelled = false;
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === assetUrls.length && !isCancelled) {
        setPageReady(true);
      }
    };

    // Preload each asset into the browser's cache
    assetUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Even if an image fails, don't trap the user forever
    });

    return () => {
      isCancelled = true;
    };
  }, [assetUrls, setPageReady]);
}