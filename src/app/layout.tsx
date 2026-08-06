import type { Metadata } from 'next';
import { IntroProvider } from '@/contexts/IntroContext';
import IntroOverlay from '@/components/modules/intro/IntroOverlay'; // 1. Import the new overlay
import './globals.css';

export const metadata: Metadata = {
  title: 'Uncle Drew Cafe',
  description: 'A premium cafe experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F3F0E7] text-[#1A1A1A]">
        <IntroProvider>
          
          {/* 2. Mount the overlay outside of your page routes */}
          <IntroOverlay />
          
          {children}
        </IntroProvider>
      </body>
    </html>
  );
}