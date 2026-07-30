import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import '../styles/variables.css';
import './globals.css';

const headingFont = localFont({
  src: [
    {
      path: '../../public/fonts/AmaticSC-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AmaticSC-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
});

const bodyFont = localFont({
  src: [
    {
      path: '../../public/fonts/IndieFlower-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
});

// FIX: Viewport is now a separate export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Uncle Drew Cafe',
  description: 'Handcrafted. Local. Honest.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}