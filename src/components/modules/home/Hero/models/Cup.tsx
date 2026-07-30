'use client';

import { useGLTF } from '@react-three/drei';

export function Model(props: any) {
  // Your screenshot shows the file is at: public/models/cup.glb
  const { scene } = useGLTF('/models/cup.glb');
  return <primitive object={scene} {...props} />;
}

useGLTF.preload('/models/cup.glb');