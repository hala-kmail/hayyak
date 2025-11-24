/**
 * OLoadingSpinner - Loading indicator component
 * 
 * A simple loading spinner with configurable size and color.
 * 
 * @example
 * ```tsx
 * <OLoadingSpinner size="large" />
 * <OLoadingSpinner color="#FF0000" />
 * ```
 */

import { useCSSVar } from '@/base/hooks';
import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { OView } from '../ui/OView';

interface OLoadingSpinnerProps extends ActivityIndicatorProps {
  /** Whether to center the spinner */
  centered?: boolean;
}

export function OLoadingSpinner({ 
  centered = false, 
  color, 
  size = 'large',
  ...props 
}: OLoadingSpinnerProps) {
  const primaryColor = useCSSVar('--color-primary-600');
  const spinnerColor = color || primaryColor;

  if (centered) {
    return (
      <OView className="flex-1 items-center justify-center">
        <ActivityIndicator color={spinnerColor} size={size} {...props} />
      </OView>
    );
  }

  return <ActivityIndicator color={spinnerColor} size={size} {...props} />;
}

