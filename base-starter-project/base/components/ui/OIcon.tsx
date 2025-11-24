/**
 * OIcon - Icon wrapper component with size and color variants
 * 
 * A unified icon component that handles sizing and coloring
 * based on the application's theme.
 * 
 * @example
 * ```tsx
 * <OIcon icon={IconHome} size="md" type="primary" />
 * <OIcon icon={IconSettings} size="lg" color="#FF0000" />
 * ```
 */

import { useCSSVar } from '@/base/hooks';
import React from 'react';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'muted';

interface OIconProps {
  /** Icon component to render */
  icon: React.ComponentType<{ size?: number; color?: string }>;
  /** Predefined size or custom number */
  size?: IconSize | number;
  /** Predefined color type */
  type?: IconType;
  /** Custom color (overrides type) */
  color?: string;
  /** Additional props for the icon component */
  [key: string]: any;
}

const sizeMap: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

export function OIcon({ icon: IconComponent, size = 'md', type = 'primary', color, ...props }: OIconProps) {
  const primaryColor = useCSSVar('--color-primary-600');
  const textColor = useCSSVar('--color-text');
  const mutedColor = useCSSVar('--color-text-muted');
  const successColor = useCSSVar('--color-success-600');
  const warningColor = useCSSVar('--color-warning-600');
  const dangerColor = useCSSVar('--color-danger-600');

  const getColorByType = (): string => {
    if (color) return color;
    
    switch (type) {
      case 'primary':
        return primaryColor;
      case 'secondary':
        return textColor;
      case 'success':
        return successColor;
      case 'warning':
        return warningColor;
      case 'danger':
        return dangerColor;
      case 'muted':
        return mutedColor;
      default:
        return primaryColor;
    }
  };

  const iconSize = typeof size === 'number' ? size : sizeMap[size];
  const iconColor = getColorByType();

  return <IconComponent size={iconSize} color={iconColor} {...props} />;
}

