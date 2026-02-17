'use client';

import { useState, useEffect, useRef } from 'react';
import { easeOutQuart, type EasingFunction } from '@/base/utils/animation';

export interface UseAnimatedCounterOptions {
  duration?: number;
  easing?: EasingFunction;
  startOnIntersect?: boolean;
  threshold?: number;
}

/**
 * Custom hook for animated counter logic
 * Following Single Responsibility Principle - handles only counter animation logic
 * Following Dependency Inversion Principle - accepts easing function as dependency
 */
export function useAnimatedCounter(
  targetValue: number,
  options: UseAnimatedCounterOptions = {}
) {
  const {
    duration = 2000,
    easing = easeOutQuart,
    startOnIntersect = true,
    threshold = 0.1,
  } = options;

  const [count, setCount] = useState(targetValue);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const previousValueRef = useRef<number>(targetValue);

  // Handle intersection observer for initial animation
  useEffect(() => {
    if (!startOnIntersect) {
      setHasAnimated(true);
      animateCounter(0, targetValue);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter(0, targetValue);
          }
        });
      },
      { threshold }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasAnimated, targetValue, startOnIntersect, threshold]);

  // Handle value updates
  useEffect(() => {
    if (targetValue !== previousValueRef.current) {
      if (hasAnimated) {
        // Animate from current value to new value
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animateCounter(count, targetValue);
      } else {
        // Update directly if animation hasn't started
        setCount(targetValue);
      }
      previousValueRef.current = targetValue;
    }
  }, [targetValue, hasAnimated, count]);

  const animateCounter = (startValue: number, endValue: number) => {
    const startTime = Date.now();

    const updateCounter = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use provided easing function
      const easedProgress = easing(progress);
      const currentValue = Math.floor(
        startValue + (endValue - startValue) * easedProgress
      );

      setCount(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(updateCounter);
      } else {
        setCount(endValue);
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateCounter);
  };

  return {
    count,
    counterRef,
  };
}
