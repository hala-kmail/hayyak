'use client';

import React from 'react';

export interface OCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'bordered' | 'flat';
  children: React.ReactNode;
  className?: string;
}

const variantClasses = {
  elevated: 'shadow-md',
  bordered: 'border border-primary-grey',
  flat: '',
};

export function OCard({ variant = 'elevated', className = '', children, style, ...props }: OCardProps) {
  return (
    <div
      className={`rounded-xl p-4 bg-white ${variantClasses[variant]} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
