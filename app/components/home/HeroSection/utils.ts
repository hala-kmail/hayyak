/**
 * Utility functions for HeroSection component
 * Following Single Responsibility Principle - only contains business logic
 */

import { HeroSectionProps, HeroStatsData } from './types';
import { StatsData } from '@/app/hooks/useStats';

/**
 * Merges API stats with prop values
 * API stats take priority over prop values
 */
export function mergeStatsData(
  apiStats: StatsData | null,
  props: HeroSectionProps
): HeroStatsData {
  return {
    totalVotes: apiStats?.totalVotes ?? props.totalVotes ?? 0,
    neighborhoodsCount: apiStats?.numberOfTowns ?? props.neighborhoodsCount ?? 3,
    votesToday: apiStats?.todayVotes ?? props.votesToday ?? 342,
    uniqueVisitors: props.uniqueVisitors ?? 0,
  };
}
