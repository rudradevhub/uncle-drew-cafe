'use client';

import { InfiniteCanvasScene } from '@/components/InfiniteCanvas/InfiniteCanvas';
import Link from 'next/link';

// --- CONFIGURATION ---
// You renamed images to 1.avif, 2.avif ... 62.avif
const TOTAL_IMAGES = 62; 

const cafeImages = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
  // Generates: /gallery/1.avif, /gallery/2.avif ... up to /gallery/62.avif
  url: `/gallery/${i + 1}.avif`, 
  width: 1200, 
  height: 800
}));

export default function GalleryPage() {
  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      
      <InfiniteCanvasScene 
        media={cafeImages} 
        showControls={true}
        backgroundColor="#000000"
        fogColor="#000000"
      />

      {/* Back Home Button */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        zIndex: 50
      }}>
        <Link 
          href="/" 
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.25rem',
            fontFamily: 'var(--font-heading, sans-serif)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            mixBlendMode: 'difference' 
          }}
        >
          ← Back Home
        </Link>
      </div>

    </main>
  );
}