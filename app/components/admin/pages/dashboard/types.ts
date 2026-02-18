/**
 * AdminStats type definitions
 * Following Interface Segregation Principle
 */

import { ReactNode } from 'react';
import type { StatsData } from '@/app/hooks/useStats';
import type { Top3Town } from '@/app/hooks/useTop3Towns';

export interface StatCardProps {
  icon: ReactNode;
  iconBgClass: string;
  label: string;
  value: string | number;
}

export interface Top3CardStyle {
  border: string;
  rankBg: string;
  rankText: string;
  accent: string;
  progressBar: string;
}

export interface Top3CardProps {
  town: Top3Town;
  rank: number;
  style: Top3CardStyle;
}

export interface LeadingTown {
  townId: string;
  name: string;
  votes: number;
}

export type { StatsData, Top3Town };
