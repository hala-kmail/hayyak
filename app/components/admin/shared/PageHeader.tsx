'use client';

import React from 'react';
import type { PageHeaderProps } from './types';
import { sharedStyles } from './styles';

/**
 * PageHeader Component
 * Following Single Responsibility Principle - only handles page title and optional action
 */
export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className={sharedStyles.pageHeader}>
      <h1 className={sharedStyles.pageTitle}>{title}</h1>
      {action}
    </div>
  );
}
