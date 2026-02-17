/**
 * Type definitions for HowItWorks component
 * Following Interface Segregation Principle - separate interfaces for different concerns
 */

import { ReactNode } from 'react';

export interface StepItem {
  title: string;
  desc: string;
  icon: ReactNode;
  color: string;
}

export interface StepCardProps {
  step: StepItem;
  index: number;
  isVisible: boolean;
}

export interface StepDividerProps {
  isVisible: boolean;
  delay: number;
}
