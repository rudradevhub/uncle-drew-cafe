'use client';

import { useScroll, Scroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { Model } from './models/Cup';

export default function Scene() {
  const scroll = useScroll();
  const cupGroupRef = useRef<THREE.Group>(null);
  
  // Blue Light Ref (For the elegant exit)
  const blueLightRef = useRef<THREE.SpotLight>(null);
  
  // HTML Refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useFrame((state, delta) => {
    // --- TIMELINE ---
    const rText = scroll.range(0, 0.4);      // Text moves to header
    const rCupEntry = scroll.range(0.1, 0.5); // Cup arrives
    const rNav = scroll.range(0.5, 0.3);      // Nav fades in
    const rExit = scroll.range(0.85, 0.15);   // The Elegant Exit

    // --- A. CUP ANIMATION ---
    if (cupGroupRef.current) {
      // 1. Movement: Rise from -8 to -1.5 (Center)
      // Then gently float up to 0.5 (Touch Header) during exit
      const entryY = -8 + (rCupEntry * 6.5);
      const exitLift = rExit * 2.5; // Gentle float, not a rocket
      
      cupGroupRef.current.position.y = Math.min(-1.5, entryY) + exitLift;

      // 2. Scale: Dissolve effect
      // Stays at 2.8 normally, shrinks smoothly to 0 on exit
      const baseScale = 2.8;
      const dissolve = 1 - rExit; 
      const s = baseScale * dissolve;
      cupGroupRef.current.scale.set(s, s, s);

      // 3. Rotation: Spin
      cupGroupRef.current.rotation.y += delta * 0.5;
    }

    // --- B. LIGHTING (The Blue Shift) ---
    if (blueLightRef.current) {
      // Intensity starts at 0, fades in to 20 during exit
      blueLightRef.current.intensity = rExit * 20;
    }

    // --- C. HTML ANIMATION ---
    if (titleRef.current && taglineRef.current && navRef.current) {
      
      // 1. TITLE: Moves to Fixed Header Position
      const moveProgress = rText; 
      // Calc: Moves from 50% down to 35px (Header Center)
      titleRef.current.style.top = `calc(50% - (${moveProgress} * (50% - 35px)))`;
      
      // Scale: Shrink to Logo size (40%)
      const scale = 1 - (moveProgress * 0.6); 
      titleRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;

      // 2. TAGLINE: Fade Out
      taglineRef.current.style.opacity = `${1 - rText * 2.5}`; 

      // 3. NAV LINKS: Fade In
      navRef.current.style.opacity = `${rNav}`;
      navRef.current.style.pointerEvents = rNav > 0.5 ? 'auto' : 'none';
    }
  });

  return (
    <>
      {/* 1. SCENE LIGHTING */}
      {/* Standard Warm Light */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      
      {/* The "Magical Blue Exit" Light (Starts off) */}
      <spotLight 
        ref={blueLightRef}
        position={[0, 5, 2]} 
        color="#4A90E2" // Beautiful Sky Blue
        distance={10}
        angle={1}
        attenuation={5}
        intensity={0} // Starts invisible
      />

      {/* 2. 3D MODEL */}
      <group 
        ref={cupGroupRef} 
        position={[0, -8, 0]} 
        scale={[2.8, 2.8, 2.8]}
      >
        <Model /> 
      </group>

      {/* 3. HTML INTERFACE */}
      <Scroll html>
        <div className="w-screen h-screen relative text-[#2A2A2A]">
          
          {/* TITLE (Becomes Logo) */}
          <h1 
            ref={titleRef}
            // 'fixed' ensures it stays pinned even if scroll acts weird
            className="fixed left-1/2 whitespace-nowrap text-center leading-none z-50 origin-center pointer-events-none"
            style={{ 
              top: '50%', 
              transform: 'translate(-50%, -50%)',
              fontSize: '7vw', 
              fontFamily: 'Permanent Marker, cursive',
            }} 
          >
            UNCLE DREW CAFE
          </h1>

          {/* TAGLINE */}
          <p 
             ref={taglineRef}
             className="fixed left-1/2 top-[60%] whitespace-nowrap text-center uppercase tracking-[0.3em] z-40 font-bold pointer-events-none"
             style={{ 
               transform: 'translate(-50%, 0)',
               fontFamily: 'Indie Flower, cursive',
               fontSize: '1.1rem'
             }}
          >
            Handcrafted. Local. Honest.
          </p>

          {/* NAV LINKS (Global Header) */}
          <div 
            ref={navRef}
            className="fixed top-0 left-0 w-full h-[80px] px-8 md:px-16 flex justify-between items-center z-50 opacity-0"
            style={{ 
              fontFamily: 'Permanent Marker, cursive',
              fontSize: '1.4rem' 
            }}
          >
            <div className="flex gap-10 w-1/3">
              <a href="#" className="hover:text-[#C0A080] transition-colors pointer-events-auto">MENU</a>
              <a href="/about" className="hover:text-[#C0A080] transition-colors pointer-events-auto">ABOUT</a>
            </div>
            <div className="w-1/3"></div> 
            <div className="flex gap-10 w-1/3 justify-end">
              <a href="#" className="hover:text-[#C0A080] transition-colors pointer-events-auto">CONTACT</a>
              <a href="/gallery" className="hover:text-[#C0A080] transition-colors pointer-events-auto">GALLERY</a>
            </div>
          </div>

        </div>
      </Scroll>
    </>
  );
}