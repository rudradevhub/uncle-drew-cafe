'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Scene from './Scene'; // We are creating this next

export default function HeroContainer() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]} // Support for Retina displays
        camera={{ position: [0, 0, 8], fov: 35 }} // Camera positioned back
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* A. Lighting Setup */}
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <Environment preset="city" />

          {/* B. The Scroll System 
              pages={4} -> Creates a "Virtual Scroll" 4x the screen height.
              damping={0.3} -> Adds weight/smoothness to the scroll.
          */}
          <ScrollControls pages={4} damping={0.3}>
            <Scene />
          </ScrollControls>
          
        </Suspense>
      </Canvas>
    </div>
  );
}