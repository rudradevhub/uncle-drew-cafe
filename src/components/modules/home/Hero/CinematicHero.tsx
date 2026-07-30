"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  onReady: () => void;
}

// If building a 4-second animation at 12fps, that's 48 frames.
const FRAME_COUNT = 48; 

export default function CinematicHero({ onReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. THE PRELOADING LOGIC
  useEffect(() => {
    let loadedImages = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Assumes your exported frames are named frame_0001.webp, etc.
      img.src = `/hero-frames/frame_${(i + 1).toString().padStart(4, "0")}.webp`;
      
      img.onload = () => {
        loadedImages++;
        // When the final image is loaded into memory, kill the preloader!
        if (loadedImages === FRAME_COUNT) {
          onReady();
          // (Initial canvas draw logic will go here)
        }
      };
      images.push(img);
    }
  }, [onReady]);

  // 2. THE GSAP SCROLL LOGIC
  useGSAP(() => {
    // We will wire up the GSAP scroll scrub to the canvas here 
    // once your image sequence is ready.
  }, { scope: containerRef });

  return (
    // The container is tall so you have room to scroll the "Scrapbook" sequence
    <section ref={containerRef} className="h-[300vh] bg-[#1A1A1A]">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}