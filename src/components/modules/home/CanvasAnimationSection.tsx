'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Generate an array from 1 to 61, filtering out 48
const FRAME_NUMBERS = Array.from({ length: 61 }, (_, i) => i + 1)
  .filter((num) => num !== 48)
  .map((num) => num.toString().padStart(3, '0'));

export default function CanvasAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const getFramePath = (frameStr: string) => `/frames/${frameStr}.webp`;

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    window.scrollTo(0, 0);

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    const sequence = { frame: 0 };
    const totalFrames = FRAME_NUMBERS.length;

    const renderFrame = (index: number) => {
      const targetImg = images[index];
      if (!targetImg || !isLoaded) return;
      
      const hRatio = canvas.width / targetImg.width;
      const vRatio = canvas.height / targetImg.height;
      const ratio = Math.max(hRatio, vRatio); 
      
      const centerShift_x = (canvas.width - targetImg.width * ratio) / 2;
      const centerShift_y = (canvas.height - targetImg.height * ratio) / 2;  
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        targetImg, 
        0, 0, targetImg.width, targetImg.height,
        centerShift_x, centerShift_y, targetImg.width * ratio, targetImg.height * ratio
      );
    };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (isLoaded) renderFrame(sequence.frame);
    };

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    const checkLoadStatus = () => {
      loadedCount++;
      if (loadedCount >= totalFrames) {
        setIsLoaded(true);
        window.scrollTo(0, 0); 
        renderFrame(0); 
      }
    };

    FRAME_NUMBERS.forEach((frameStr) => {
      const img = new window.Image();
      img.src = getFramePath(frameStr);
      img.onload = checkLoadStatus;
      img.onerror = checkLoadStatus; 
      images.push(img);
    });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${totalFrames * 75}`, 
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const nextFrame = Math.round(self.progress * (totalFrames - 1));
        if (sequence.frame !== nextFrame) {
          sequence.frame = nextFrame;
          renderFrame(nextFrame);
        }
      }
    });

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isLoaded]);

  return (
    // FIX: Changed h-screen to h-[100dvh] to prevent iOS Safari jumping
    <section ref={containerRef} className="relative w-full h-[100dvh] bg-[#F3F0E7] overflow-hidden z-10">
      <canvas 
        ref={canvasRef} 
        className={`w-full h-full block transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F3F0E7] z-50">
          {/* FIX: Scaled loading text for mobile */}
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/50 animate-pulse text-center px-4">
            Loading Sequence ({FRAME_NUMBERS.length} frames)...
          </span>
        </div>
      )}
    </section>
  );
}