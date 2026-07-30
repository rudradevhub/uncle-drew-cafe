'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './GlobalHeader.module.css';

interface GlobalHeaderProps {
  heroProgress?: number;
}

export default function GlobalHeader({ heroProgress = 1 }: GlobalHeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  // --- CONFIGURATION ---
  const LOCK_POINT = 0.4;

  // 1. NAV VISIBILITY
  const isNavVisible = !isHome || (heroProgress >= LOCK_POINT);

  // 2. LOGO ANIMATION
  let logoScale = 1;
  let logoY = 0;
  let taglineOpacity = 0; 

  if (isHome) {
    const animPhase = Math.min(heroProgress / LOCK_POINT, 1);
    const reversePhase = 1 - animPhase; 

    // Scale: 1.5 -> 1.0
    logoScale = 1 + (reversePhase * 0.5);

    // Position: Starts 40vh down, Ends 0vh
    logoY = reversePhase * 40;

    // Tagline: Visible at start
    taglineOpacity = Math.max(0, 1 - (heroProgress * 8));
  }

  return (
    <header 
      className={styles.header}
      data-nav-visible={isNavVisible}
    >
      <nav className={styles.navLeft}>
        <Link href="/menu" className={styles.link}>Menu</Link>
        <Link href="/about" className={styles.link}>About</Link>
      </nav>

      <div className={styles.centerCluster}>
        {/* The Wrapper moves Up/Down */}
        <div 
          style={{
            transform: `translateY(${logoY}vh) scale(${logoScale})`,
            transformOrigin: 'center center',
            willChange: 'transform',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Link href="/" className={styles.wordmarkLink}>
            <h1 className={styles.wordmark}>
              UNCLE DREW CAFE
            </h1>
          </Link>

          {/* Tagline moves perfectly with it */}
          {isHome && (
             <p 
               className={styles.tagline}
               style={{ opacity: taglineOpacity }}
             >
               Handcrafted. Local. Honest.
             </p>
          )}
        </div>
      </div>

      <nav className={styles.navRight}>
        <Link href="/contact" className={styles.link}>Contact</Link>
        <Link href="/gallery" className={styles.link}>Gallery</Link>
      </nav>
    </header>
  );
}