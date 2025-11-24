/**
 * OBadge - Badge component for labels and status indicators
 * 
 * A small label component for displaying status, counts, or categories.
 * 
 * @example
 * ```tsx
 * <OBadge variant="success">Approved</OBadge>
 * <OBadge variant="danger" size="sm">Error</OBadge>
 * <OBadge variant="primary">3</OBadge>
 * ```
 */

import { useCSSVar } from '@/base/hooks';
import React from 'react';
import { ViewProps } from 'react-native';
import { OText } from './OText';
import { OView } from './OView';

interface OBadgeProps extends ViewProps {
  /** Badge variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Badge content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function OBadge({
  variant = 'primary',
  size = 'md',
  children,
  className,
  style,
  ...props
}: OBadgeProps) {
  const primaryColor = useCSSVar('--color-primary-600');
  const successColor = useCSSVar('--color-success-600');
  const warningColor = useCSSVar('--color-warning-600');
  const dangerColor = useCSSVar('--color-danger-600');
  const gray100Color = useCSSVar('--color-gray-100');
  const gray600Color = useCSSVar('--color-gray-600');
  const whiteColor = useCSSVar('--color-white');

  const getVariantColors = () => {
    switch (variant) {
      case 'primary':
        return { bg: primaryColor, text: whiteColor };
      case 'success':
        return { bg: successColor, text: whiteColor };
      case 'warning':
        return { bg: warningColor, text: whiteColor };
      case 'danger':
        return { bg: dangerColor, text: whiteColor };
      case 'secondary':
        return { bg: gray100Color, text: gray600Color };
      default:
        return { bg: primaryColor, text: whiteColor };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5';
      case 'md':
        return 'px-2.5 py-1';
      case 'lg':
        return 'px-3 py-1.5';
      default:
        return 'px-2.5 py-1';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'md':
        return 'text-sm';
      case 'lg':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  const colors = getVariantColors();

  return (
    <OView
      className={`rounded-full inline-flex items-center justify-center ${getSizeClasses()} ${className || ''}`}
      style={[{ backgroundColor: colors.bg }, style]}
      {...props}>
      <OText
        className={`${getTextSize()} font-semibold`}
        style={{ color: colors.text }}>
        {children}
      </OText>
    </OView>
  );
}

