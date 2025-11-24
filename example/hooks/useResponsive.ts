/**
 * useResponsive - Hook for responsive design
 * 
 * Provides utilities for responsive layouts based on screen dimensions.
 * 
 * @example
 * ```tsx
 * const { width, height, isSmall, isMedium, isLarge } = useResponsive();
 * 
 * const columns = isSmall ? 1 : isMedium ? 2 : 3;
 * ```
 */

import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface ResponsiveState {
  width: number;
  height: number;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
}

const BREAKPOINTS = {
  small: 640,
  medium: 768,
  large: 1024,
};

export function useResponsive(): ResponsiveState {
  const [dimensions, setDimensions] = useState<ScaledSize>(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;

  return {
    width,
    height,
    isSmall: width < BREAKPOINTS.small,
    isMedium: width >= BREAKPOINTS.small && width < BREAKPOINTS.medium,
    isLarge: width >= BREAKPOINTS.large,
    isPortrait: height > width,
    isLandscape: width > height,
  };
}

