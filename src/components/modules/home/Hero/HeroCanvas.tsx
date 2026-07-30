'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, SpotLight } from '@react-three/drei';
import * as THREE from 'three';

// --- CUP MODEL LOGIC (UNCHANGED) ---
function CupModel({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/cup.glb');

  useFrame(() => {
    if (!ref.current) return;

    const LOCK_POINT = 0.4;
    const EXIT_START = 0.85; 
    const START_Y = -6;    
    const LOCK_Y = -2.0;   
    const EXIT_Y = 2.0; 

    let targetY = START_Y;
    let targetRotation = 0;

    // Phase 1: Enter (0% -> 85%)
    if (progress <= EXIT_START) {
      const movePhase = Math.min(progress / LOCK_POINT, 1);
      const smoothMove = THREE.MathUtils.smoothstep(movePhase, 0, 1);
      targetY = THREE.MathUtils.lerp(START_Y, LOCK_Y, smoothMove);
      
      const rotPhase = progress / EXIT_START;
      const startRot = Math.PI / 3;
      const totalSpin = (295 * Math.PI) / 180;
      targetRotation = startRot - (rotPhase * totalSpin);
    } 
    // Phase 2: Exit (85% -> 100%)
    else {
      const exitPhase = (progress - EXIT_START) / (1 - EXIT_START);
      const smoothExit = THREE.MathUtils.smoothstep(exitPhase, 0, 1);
      targetY = THREE.MathUtils.lerp(LOCK_Y, EXIT_Y, smoothExit);

      const endRot = (Math.PI / 3) - ((295 * Math.PI) / 180);
      targetRotation = endRot - (exitPhase * 0.5);
    }

    ref.current.position.y = targetY;
    ref.current.rotation.y = targetRotation;
  });

  return (
    <primitive object={scene} ref={ref} position={[0, -6, 0]} scale={2.0} />
  );
}

useGLTF.preload('/models/cup.glb');

// --- MAIN CANVAS (CLEAN) ---
export default function HeroCanvas({ progress }: { progress: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ 
        antialias: true, // Turned AA back on for sharpness
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1
      }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <Environment preset="studio" />
      
      <ambientLight intensity={0.4} />
      <SpotLight 
        position={[5, 5, 5]} 
        angle={0.3} 
        penumbra={1} 
        intensity={2} 
        castShadow 
      />
      
      <directionalLight position={[-5, 5, 5]} intensity={0.5} />

      <CupModel progress={progress} />
      
      <ContactShadows 
        position={[0, -2.5, 0]} 
        opacity={0.5} 
        scale={12} 
        blur={2.5} 
        far={4.5} 
        color="#000000"
      />

    </Canvas>
  );
}