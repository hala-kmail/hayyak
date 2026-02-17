'use client';

import React from 'react';
import { sharedStyles } from './styles';

interface LoadingStateProps {
  message?: string;
}

/**
 * LoadingState Component
 * Following Single Responsibility Principle - only handles loading spinner display
 */
export function LoadingState({ message = 'جاري التحميل...' }: LoadingStateProps) {
  return (
    <div className={sharedStyles.loadingContainer}>
      <div className={sharedStyles.loadingSpinner} />
      <p className={sharedStyles.loadingText}>{message}</p>
    </div>
  );
}
