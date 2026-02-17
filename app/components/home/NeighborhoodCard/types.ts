/**
 * Type definitions for NeighborhoodCard component
 * Following Interface Segregation Principle - separate interfaces for different concerns
 */

import type { NeighborhoodItem } from '../data';

export interface NeighborhoodCardProps {
  neighborhood: NeighborhoodItem;
  totalVotes: number;
  onClick?: () => void;
  isLeader?: boolean;
}
