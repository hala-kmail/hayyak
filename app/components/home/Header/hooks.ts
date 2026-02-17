'use client';

import { useState, useEffect, useRef } from 'react';
import { SCROLL_THRESHOLD, DRAWER_DURATION_MS } from './constants';

/**
 * Custom hook for scroll detection
 * Following Single Responsibility Principle - only handles scroll state
 */
export function useScrollDetection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return scrolled;
}

/**
 * Custom hook for mobile menu state management
 * Following Single Responsibility Principle - only handles menu state
 */
export function useMobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerAnimateIn, setDrawerAnimateIn] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mobileMenuOpen) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      const t = requestAnimationFrame(() => {
        setDrawerAnimateIn(true);
      });
      return () => {
        cancelAnimationFrame(t);
      };
    } else {
      setDrawerAnimateIn(false);
    }
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setDrawerAnimateIn(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setMobileMenuOpen(false);
      closeTimeoutRef.current = null;
    }, DRAWER_DURATION_MS);
  };

  const toggleMenu = () => {
    setMobileMenuOpen((o) => !o);
  };

  return {
    mobileMenuOpen,
    drawerAnimateIn,
    toggleMenu,
    closeMenu,
  };
}
