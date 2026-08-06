'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation'; 

interface IntroContextType {
  isTransitioning: boolean;
  isPageReady: boolean;
  isFirstVisit: boolean;
  setTransitioning: (val: boolean) => void;
  setPageReady: (val: boolean) => void;
  markFirstVisitComplete: () => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setTransitioning] = useState(true); 
  const [isPageReady, setPageReady] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  // Track the current URL
  const pathname = usePathname(); 

  // The Route Listener
  // Every time the user clicks a link and the pathname changes, this fires instantly.
  useEffect(() => {
    // Drop the video curtain
    setTransitioning(true);
    // Reset the lock so the new page has to prove it is ready
    setPageReady(false);
  }, [pathname]);

  const markFirstVisitComplete = () => setIsFirstVisit(false);

  const value = useMemo(() => ({
    isTransitioning,
    isPageReady,
    isFirstVisit,
    setTransitioning,
    setPageReady,
    markFirstVisitComplete,
  }), [isTransitioning, isPageReady, isFirstVisit]);

  return (
    <IntroContext.Provider value={value}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error('useIntro must be used within an IntroProvider');
  }
  return context;
}