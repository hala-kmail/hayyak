'use client';

import { useCSSVar } from '@/base/hooks';
import React from 'react';

export interface ScreenLayoutProps {
  scrollable?: boolean;
  noPadding?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function ScreenLayout({
  scrollable = true,
  noPadding = false,
  children,
  className = '',
}: ScreenLayoutProps) {
  const backgroundColor = useCSSVar('--color-background');

  const paddingClass = noPadding ? '' : 'px-4 py-6 md:px-6 md:py-8';

  if (scrollable) {
    return (
      <div
        className={`min-h-screen ${className}`}
        style={{ backgroundColor }}
      >
        <main className={`min-h-screen ${paddingClass} max-w-6xl mx-auto`}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${paddingClass} ${className}`}
      style={{ backgroundColor }}
    >
      <main className="max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
