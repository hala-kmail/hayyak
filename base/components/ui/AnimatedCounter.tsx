'use client';

import React from 'react';
import { formatNumber } from '@/base/utils';
import { useAnimatedCounter, type UseAnimatedCounterOptions } from '@/base/hooks/useAnimatedCounter';

export interface AnimatedCounterProps extends UseAnimatedCounterOptions {
  value: number;
  className?: string;
  formatter?: (value: number) => string;
}

/**
 * Reusable AnimatedCounter component
 * Following Single Responsibility Principle - only handles counter display
 * Following Open/Closed Principle - extensible via props
 */
export function AnimatedCounter({
  value,
  duration = 2000,
  easing,
  startOnIntersect = true,
  threshold = 0.1,
  className = '',
  formatter = formatNumber,
}: AnimatedCounterProps) {
  const { count, counterRef } = useAnimatedCounter(value, {
    duration,
    easing,
    startOnIntersect,
    threshold,
  });

  return (
    <div ref={counterRef} className={className}>
      {formatter(count)}
    </div>
  );
}
