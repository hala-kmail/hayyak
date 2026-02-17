'use client';

import React from 'react';
import { sharedStyles } from './styles';

interface EmptyStateProps {
  message: string;
}

/**
 * EmptyState Component
 * Following Single Responsibility Principle - only handles empty state display
 */
export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className={sharedStyles.emptyContainer}>
      <p className={sharedStyles.emptyText}>{message}</p>
    </div>
  );
}
