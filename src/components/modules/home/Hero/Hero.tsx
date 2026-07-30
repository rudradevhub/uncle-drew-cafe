"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      // Create a timeline linked to the scroll position of the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Adds a slight, premium delay to the scrub
        },
      });

      // Animate the cream background and text mask upward
      // Note: "cream-layer" and "text-layer" must match the IDs inside your SVG
      tl.to(
        "#cream-layer, #text-layer",
        {
          yPercent: -100, // Move entirely out of the top of the frame
          ease: "none",
        },
        0 // Start exactly at the beginning of the timeline
      );

      // Add a very subtle, slow scale to the background cafe image for cinematic effect
      tl.to(
        "#cafe-image",
        {
          scale: 1.05,
          transformOrigin: "center center",
          ease: "none",
        },
        0
      );
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[200vh] bg-[#1A1A1A]"
    >
      {/* Sticky container holds the viewport in place while scrolling */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* INLINE SVG PLACEHOLDER */}
        {/* The SVG must be inline so GSAP can target its internal IDs */}
        <svg
          ref={svgRef}
          viewBox="0 0 1920 1080"
          className="w-full h-full object-cover will-change-transform"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* 1. Base Image Layer (Stays static/scales slightly) */}
          <g id="cafe-image">
             {/* Your cafe image path/image tag goes here */}
          </g>

          {/* 2. Cream Background Layer (Moves Up) */}
          <g id="cream-layer" className="will-change-transform">
             {/* Your #F3F0E7 background rect/path goes here */}
          </g>

          {/* 3. Typography Mask Layer (Moves Up) */}
          <g id="text-layer" className="will-change-transform">
             {/* Your UNCLE DREW text paths go here */}
          </g>
        </svg>

      </div>
    </section>
  );
}