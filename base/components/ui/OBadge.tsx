'use client';

import { useCSSVar } from '@/base/hooks';
import React from 'react';

export interface OBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function OBadge({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  style,
  ...props
}: OBadgeProps) {
  const primaryColor = useCSSVar('--color-primary-600');
  const successColor = useCSSVar('--color-success-600');
  const warningColor = useCSSVar('--color-warning-600');
  const dangerColor = useCSSVar('--color-danger-600');
  const gray100 = useCSSVar('--color-gray-100');
  const gray600 = useCSSVar('--color-gray-600');
  const white = useCSSVar('--color-white');

  const bgMap = {
    primary: primaryColor,
    success: successColor,
    warning: warningColor,
    danger: dangerColor,
    secondary: gray100,
  };
  const textMap = {
    primary: white,
    success: white,
    warning: white,
    danger: white,
    secondary: gray600,
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`rounded-full inline-flex items-center justify-center font-semibold ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: bgMap[variant], color: textMap[variant], ...style }}
      {...props}
    >
      {children}
    </span>
  );
}
