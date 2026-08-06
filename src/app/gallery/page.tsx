'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useIntroRegistry } from '@/hooks/useIntroRegistry';

// --- THE FIX: DYNAMICALLY IMPORT THE 3D CANVAS ---
// This tells Next.js to completely skip this component during the server build
// and only load it once the user's browser (and 'window') is ready.
const InfiniteCanvasScene = dynamic(
  () => import('@/components/InfiniteCanvas/InfiniteCanvas').then((mod) => mod.InfiniteCanvasScene),
  { ssr: false }
);

// --- CONFIGURATION ---
const TOTAL_IMAGES = 62; 

const cafeImages = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
  url: `/gallery/${i + 1}.avif`, 
  width: 1200, 
  height: 800
}));

export default function GalleryPage() {
  // PRO PERFORMANCE STRATEGY:
  // Preload only the first 12 images so the initial 3D viewport has textures ready instantly,
  // while avoiding overwhelming the browser's network pipe with 62 concurrent downloads.
  const criticalGalleryAssets = cafeImages.slice(0, 12).map(img => img.url);
  useIntroRegistry(criticalGalleryAssets);

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