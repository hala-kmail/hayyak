/**
 * OCard - Card container component with elevation and border
 * 
 * A reusable card component for grouping content with consistent styling.
 * 
 * @example
 * ```tsx
 * <OCard>
 *   <OText className="font-bold">Card Title</OText>
 *   <OText>Card content goes here</OText>
 * </OCard>
 * 
 * <OCard variant="bordered" className="mb-4">
 *   <OText>Bordered card</OText>
 * </OCard>
 * ```
 */

import { useCSSVar } from '@/base/hooks';
import { useTheme } from '@/providers/ThemeProvider';
import React from 'react';
import { ViewProps } from 'react-native';
import { OView } from './OView';

interface OCardProps extends ViewProps {
  /** Card variant */
  variant?: 'elevated' | 'bordered' | 'flat';
  /** Additional CSS classes */
  className?: string;
  /** Children components */
  children: React.ReactNode;
}

export function OCard({ variant = 'elevated', className, style, children, ...props }: OCardProps) {
  const { isDark } = useTheme();
  const surfaceColor = useCSSVar('--color-surface');
  const borderColor = useCSSVar('--color-border');

  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.3 : 0.1,
          shadowRadius: 4,
          elevation: 3,
        };
      case 'bordered':
        return {
          borderWidth: 1,
          borderColor: borderColor,
        };
      case 'flat':
      default:
        return {};
    }
  };

  return (
    <OView
      className={`rounded-xl p-4 ${className || ''}`}
      style={[
        { backgroundColor: surfaceColor },
        getVariantStyles(),
        style,
      ]}
      {...props}>
      {children}
    </OView>
  );
}

