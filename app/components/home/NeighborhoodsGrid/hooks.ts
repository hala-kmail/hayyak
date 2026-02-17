'use client';

import { useRef } from 'react';
import { SCROLL_AMOUNT } from './constants';

/**
 * Custom hook for horizontal scrolling
 * Following Single Responsibility Principle - only handles scroll logic
 */
export function useHorizontalScroll() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
        behavior: 'smooth',
      });
    }
  };

  return {
    scrollContainerRef,
    scroll,
  };
}
