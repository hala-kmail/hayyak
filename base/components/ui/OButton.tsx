'use client';

import { useCSSVar } from '@/base/hooks';
import React from 'react';

export interface OButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function OButton({
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled,
  children,
  style,
  ...props
}: OButtonProps) {
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
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-5 text-sm',
    lg: 'py-3 px-6 text-base',
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`rounded-full font-medium transition-colors inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: bgMap[variant],
        color: textMap[variant],
        ...style,
      }}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
