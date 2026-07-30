"use client";

import { useState } from "react";
import Preloader from "@/components/modules/home/Preloader";
import CinematicHero from "@/components/modules/home/Hero/CinematicHero";

export default function HomePage() {
  // State controls when the preloader vanishes
  const [isReady, setIsReady] = useState(false);

  return (
    <main className="relative w-full min-h-screen">
      {/* 1. The Preloader covers the screen until isReady is true */}
      {!isReady && <Preloader />}

      {/* 2. The Hero mounts immediately to begin fetching the 12fps sequence */}
      {/* Once it finishes fetching all frames, it calls setIsReady(true) */}
      <CinematicHero onReady={() => setIsReady(true)} />
    </main>
  );
}