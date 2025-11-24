/**
 * OSkeleton - Loading skeleton component
 * 
 * A skeleton loader component for displaying loading states with
 * animated shimmer effect.
 * 
 * @example
 * ```tsx
 * <OSkeleton width={200} height={20} />
 * <OSkeleton variant="circle" width={50} height={50} />
 * <OSkeleton variant="text" count={3} />
 * ```
 */

import { useCSSVar } from '@/base/hooks';
import React, { useEffect } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { OView } from './OView';

interface OSkeletonProps {
  /** Width of skeleton */
  width?: number | string;
  /** Height of skeleton */
  height?: number | string;
  /** Variant type */
  variant?: 'rect' | 'circle' | 'text';
  /** Number of lines (for text variant) */
  count?: number;
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: ViewStyle;
}

export function OSkeleton({
  width = '100%',
  height = 20,
  variant = 'rect',
  count = 1,
  className,
  style,
}: OSkeletonProps) {
  const animatedValue = new Animated.Value(0);
  const gray200Color = useCSSVar('--color-gray-200');
  const gray300Color = useCSSVar('--color-gray-300');

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'circle':
        return {
          borderRadius: typeof width === 'number' ? width / 2 : 50,
        };
      case 'text':
        return {
          borderRadius: 4,
        };
      case 'rect':
      default:
        return {
          borderRadius: 8,
        };
    }
  };

  const skeletonStyle: ViewStyle = {
    width,
    height,
    backgroundColor: gray200Color,
    ...getVariantStyle(),
    ...style,
  };

  if (variant === 'text' && count > 1) {
    return (
      <OView className={className}>
        {Array.from({ length: count }).map((_, index) => (
          <Animated.View
            key={index}
            style={[
              skeletonStyle,
              { opacity, marginBottom: index < count - 1 ? 8 : 0 },
            ]}
          />
        ))}
      </OView>
    );
  }

  return <Animated.View style={[skeletonStyle, { opacity }]} />;
}

