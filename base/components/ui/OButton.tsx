'use client';

import React from 'react';

export interface OButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const variantBgMap = {
  primary: 'bg-primary-gold',
  success: 'bg-lime-green',
  warning: 'bg-sand-brown',
  danger: 'bg-quite-purple',
  secondary: 'bg-primary-grey',
} as const;

const variantTextMap = {
  primary: 'text-navy-blue',
  success: 'text-navy-blue',
  warning: 'text-navy-blue',
  danger: 'text-white',
  secondary: 'text-white',
} as const;

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
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-5 text-sm',
    lg: 'py-2.5 px-6 text-base',
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`rounded-full font-medium transition-colors inline-flex items-center justify-center ${sizeClasses[size]} ${variantBgMap[variant]} ${variantTextMap[variant]} ${className}`}
      style={style}
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
