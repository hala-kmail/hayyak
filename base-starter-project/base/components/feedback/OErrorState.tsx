/**
 * OErrorState - Error state component
 * 
 * A component for displaying error states with retry functionality.
 * 
 * @example
 * ```tsx
 * <OErrorState 
 *   title="Failed to load data"
 *   message={error.message}
 *   onRetry={() => refetch()}
 * />
 * ```
 */

import { useCSSVar } from '@/base/hooks';
import React from 'react';
import { ViewStyle } from 'react-native';
import { OButton } from '../ui/OButton';
import { OText } from '../ui/OText';
import { OView } from '../ui/OView';

interface OErrorStateProps {
  /** Error title */
  title?: string;
  /** Error message */
  message: string;
  /** Retry button handler */
  onRetry?: () => void;
  /** Retry button label */
  retryLabel?: string;
  /** Container styles */
  style?: ViewStyle;
}

export function OErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try Again',
  style,
}: OErrorStateProps) {
  const textColor = useCSSVar('--color-text');
  const dangerColor = useCSSVar('--color-danger-600');

  return (
    <OView 
      className="flex-1 items-center justify-center px-8 py-12"
      style={style}>
      <OText 
        className="text-xl font-bold text-center mb-2"
        style={{ color: dangerColor }}>
        {title}
      </OText>
      <OText 
        className="text-base text-center mb-6"
        style={{ color: textColor }}>
        {message}
      </OText>
      {onRetry && (
        <OButton variant="primary" onPress={onRetry}>
          {retryLabel}
        </OButton>
      )}
    </OView>
  );
}

