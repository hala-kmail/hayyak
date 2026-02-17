/**
 * Shared admin component types
 * Following Interface Segregation Principle - separate interfaces for different concerns
 */

import { ReactNode } from 'react';

export type AlertVariant = 'error' | 'success' | 'info';

export interface PageHeaderProps {
  title: string;
  action?: ReactNode;
}

export interface AlertBannerProps {
  message: string;
  variant?: AlertVariant;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
