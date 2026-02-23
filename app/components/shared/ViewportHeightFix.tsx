'use client';

import { useEffect } from 'react';

/**
 * Fixes iOS Safari 100vh bug - address bar changes viewport height.
 * Sets --vh CSS variable (1% of actual viewport) for use in calc(var(--vh, 1vh) * 100).
 */
export function ViewportHeightFix() {
  useEffect(() => {
    const setVh = () => {
      if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      }
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);
  return null;
}
