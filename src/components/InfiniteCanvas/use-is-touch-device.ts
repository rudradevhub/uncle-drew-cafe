import * as React from "react";

const getIsTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const hasTouchEvent = "ontouchstart" in window;
  const hasTouchPoints = navigator.maxTouchPoints > 0;
  const hasCoarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;

  return hasTouchEvent || hasTouchPoints || hasCoarsePointer;
};

export function useIsTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsTouchDevice(getIsTouchDevice());
    
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const handleChange = () => setIsTouchDevice(getIsTouchDevice());

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isTouchDevice;
}