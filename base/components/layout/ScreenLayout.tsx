'use client';

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
  const paddingClass = noPadding ? '' : 'px-4 py-6 md:px-6 md:py-8';

  if (scrollable) {
    return (
      <div className={`min-h-screen bg-transparent ${className}`}>
        <main className={`min-h-screen ${paddingClass} `}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-transparent ${paddingClass} ${className}`}>
      <main >{children}</main>
    </div>
  );
}
