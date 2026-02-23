'use client';

import React from 'react';

export interface OBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'warningLight' | 'danger' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const variantClasses = {
  primary: 'bg-primary-gold text-navy-blue',
  success: 'bg-lime-green text-navy-blue',
  warning: 'bg-sand-brown-light text-black ',
  warningLight: 'bg-sand-brown-light text-sand-brown',
  danger: 'bg-quite-purple text-white',
  secondary: 'bg-primary-grey text-white',
} as const;

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
} as const;

export function OBadge({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  style,
  ...props
}: OBadgeProps) {
  return (
    <span
      className={`rounded-full inline-flex items-center justify-center font-semibold ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
}
