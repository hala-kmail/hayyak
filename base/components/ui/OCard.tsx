'use client';

import { useCSSVar } from '@/base/hooks';
import React from 'react';

export interface OCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'bordered' | 'flat';
  children: React.ReactNode;
  className?: string;
}

export function OCard({ variant = 'elevated', className = '', children, style, ...props }: OCardProps) {
  const surfaceColor = useCSSVar('--color-surface');
  const borderColor = useCSSVar('--color-border');

  const variantStyle: React.CSSProperties =
    variant === 'elevated'
      ? { boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' }
      : variant === 'bordered'
        ? { border: `1px solid ${borderColor}` }
        : {};

  return (
    <div
      className={`rounded-xl p-4 ${className}`}
      style={{ backgroundColor: surfaceColor, ...variantStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
