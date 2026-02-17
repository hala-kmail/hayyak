'use client';

import React from 'react';
import { pageStyles } from './styles';
import { LoadingStateProps, ErrorStateProps } from './types';

/**
 * Loading State Component
 * Following Single Responsibility Principle - only handles loading display
 */
export function LoadingState({ message = 'جاري تحميل الأحياء...' }: LoadingStateProps) {
  return (
    <div className={pageStyles.loadingContainer}>
      <div className={pageStyles.loadingSpinner} />
      <p className={pageStyles.loadingText}>{message}</p>
    </div>
  );
}

/**
 * Error State Component
 * Following Single Responsibility Principle - only handles error display
 */
export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className={pageStyles.errorContainer}>
      <p className={pageStyles.errorMessage}>{error}</p>
      <button onClick={onRetry} className={pageStyles.retryButton}>
        إعادة المحاولة
      </button>
    </div>
  );
}
