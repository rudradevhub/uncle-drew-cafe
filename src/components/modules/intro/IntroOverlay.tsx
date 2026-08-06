'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useIntro } from '@/contexts/IntroContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function IntroOverlay() {
  const { 
    isTransitioning, 
    isPageReady, 
    setTransitioning, 
    isFirstVisit, 
    markFirstVisitComplete 
  } = useIntro();
  
  // Refs for GSAP and HTML elements
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Lock 1: Has the video played once?
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  
  // Physical DOM render state
  const [isMounted, setIsMounted] = useState(true);

  // --- UPDATED: Zero-Shift Scroll Lock ---
  // Blocks scroll events without hiding the scrollbar, preventing layout jumps and mobile rubber-banding
  useEffect(() => {
    if (!isMounted) return;

    const preventDefault = (e: Event) => e.preventDefault();
    
    const preventKeyScroll = (e: KeyboardEvent) => {
      // Block keys that trigger scrolling
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };

    // Lock mouse wheel, trackpad, and touch swipes (passive: false is required to allow preventDefault)
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });

    // Failsafe cleanup
    return () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, [isMounted]);

  // 1. Re-arm the system on route changes
  useEffect(() => {
    if (isTransitioning) {
      setIsMounted(true);
      setHasPlayedOnce(false); // Reset the video lock for the new page
    }
  }, [isTransitioning]);

  // 2. The Split Sync Engine (The Master Logic)
  useEffect(() => {
    if (!isTransitioning) return; // Prevent unnecessary runs if already finished

    if (isFirstVisit) {
      // RULE A (First Visit): Must wait for BOTH the video to loop once AND the page to be ready
      if (hasPlayedOnce && isPageReady) {
        setTransitioning(false); // Signal the transition is logically over
        markFirstVisitComplete(); // Officially mark first visit as complete
      }
    } else {
      // RULE B (Subsequent Visits): Ignore the video loop, cut immediately when page is ready
      if (isPageReady) {
        setTransitioning(false);
      }
    }
  }, [hasPlayedOnce, isPageReady, isTransitioning, isFirstVisit, setTransitioning, markFirstVisitComplete]);

  // 3. The Cinematic GSAP Fade
  useGSAP(() => {
    if (!containerRef.current) return;

    if (isTransitioning) {
      // Ensure the overlay is fully opaque when a new route starts
      gsap.set(containerRef.current, { opacity: 1 });
    } else if (!isTransitioning && isMounted) {
      // Fade out smoothly over 1.2 seconds when locks open
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsMounted(false); // Physically remove from the DOM
        }
      });
    }
  }, [isTransitioning, isMounted]);

  // 4. Video Loop Interceptor
  const handleVideoEnd = () => {
    setHasPlayedOnce(true);
    
    // If it is the first visit and the page isn't ready yet, loop manually.
    // (If it's a subsequent visit, we don't need to force a loop because it cuts immediately anyway).
    if (isFirstVisit && !isPageReady && videoRef.current) {
      videoRef.current.play();
    }
  };

  // If the transition is fully complete AND faded out, render nothing.
  if (!isMounted) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#F3F0E7] flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        src="/intro.mp4" 
        className="w-full h-full object-cover" 
        autoPlay
        muted      
        playsInline 
        onEnded={handleVideoEnd}
      />
    </div>
  );
}