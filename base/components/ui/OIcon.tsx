'use client';

import { useCSSVar } from '@/base/hooks';
import React from 'react';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface OIconProps {
  children?: React.ReactNode;
  size?: IconSize | number;
  type?: 'primary' | 'secondary' | 'muted';
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

export function OIcon({
  children,
  size = 'md',
  type = 'primary',
  color,
  className = '',
  style,
}: OIconProps) {
  const primaryColor = useCSSVar('--primary-turquoise');
  const navyBlue = useCSSVar('--navy-blue');
  const primaryGrey = useCSSVar('--primary-grey');
  const colorMap = { primary: primaryColor, secondary: navyBlue, muted: primaryGrey };
  const resolvedColor = color ?? colorMap[type];
  const pixelSize = typeof size === 'number' ? size : sizeMap[size];

  if (!children) {
    return null;
  }

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
        color: resolvedColor,
        ...style,
      }}
      aria-hidden
    >
      {children}
    </span>
  );
}
