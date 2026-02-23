'use client';

import { useEffect } from 'react';

/**
 * Fixes iOS Safari 100vh bug - address bar changes viewport height.
 * Sets --vh CSS variable (1% of actual viewport) for use in calc(var(--vh, 1vh) * 100).
 * Also sets data-ios for CSS to reduce heavy blur/animations that cause hangs on older iOS.
 */
export function ViewportHeightFix() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const doc = document.documentElement;

    const setVh = () => {
      doc.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    if (isIOS) {
      doc.setAttribute('data-ios', 'true');
    }

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);
  return null;
}
