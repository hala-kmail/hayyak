/**
 * Type definitions for NeighborhoodsGrid component
 * Following Interface Segregation Principle - separate interfaces for different concerns
 */

import type { NeighborhoodItem } from '../data';

export interface NeighborhoodsGridProps {
  neighborhoods: NeighborhoodItem[];
  totalVotes: number;
  onVoteSuccess?: () => void;
}

export type TabType = 'all' | 'top';

export interface GridCardProps {
  neighborhood: NeighborhoodItem;
  totalVotes: number;
  maxVotes: number;
  rank: number;
  progress: number;
  isLeader: boolean;
  iconConfig: {
    icon: React.ReactNode;
    iconColor: string;
  };
  onClick: () => void;
  cardWidth: string;
}
