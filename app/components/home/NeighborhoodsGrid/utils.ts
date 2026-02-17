/**
 * Utility functions for NeighborhoodsGrid component
 * Following Single Responsibility Principle - only contains business logic
 */

import type { NeighborhoodItem } from '../../data';
import type { TabType } from './types';

/**
 * Sorts neighborhoods by votes (descending)
 */
export function sortNeighborhoodsByVotes(
  neighborhoods: NeighborhoodItem[]
): NeighborhoodItem[] {
  return [...neighborhoods].sort((a, b) => b.votes - a.votes);
}

/**
 * Gets top N neighborhoods
 */
export function getTopNeighborhoods(
  neighborhoods: NeighborhoodItem[],
  count: number = 3
): NeighborhoodItem[] {
  const sorted = sortNeighborhoodsByVotes(neighborhoods);
  return sorted.slice(0, count);
}

/**
 * Filters neighborhoods by search query
 */
export function filterNeighborhoods(
  neighborhoods: NeighborhoodItem[],
  searchQuery: string
): NeighborhoodItem[] {
  if (!searchQuery.trim()) {
    return neighborhoods;
  }

  const query = searchQuery.toLowerCase().trim();
  return neighborhoods.filter(
    (n) =>
      n.name.toLowerCase().includes(query) ||
      n.location.toLowerCase().includes(query)
  );
}

/**
 * Gets base neighborhoods based on active tab
 */
export function getBaseNeighborhoods(
  neighborhoods: NeighborhoodItem[],
  activeTab: TabType
): NeighborhoodItem[] {
  if (activeTab === 'top') {
    return getTopNeighborhoods(neighborhoods, 3);
  }
  return sortNeighborhoodsByVotes(neighborhoods);
}

/**
 * Calculates maximum votes from neighborhoods
 */
export function getMaxVotes(neighborhoods: NeighborhoodItem[]): number {
  return Math.max(...neighborhoods.map((n) => n.votes), 0);
}

/**
 * Calculates progress percentage
 */
export function calculateProgress(
  votes: number,
  totalVotes: number
): number {
  return totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
}

/**
 * Checks if neighborhood is leader
 */
export function isLeader(
  votes: number,
  maxVotes: number
): boolean {
  return votes === maxVotes && votes > 0;
}

/**
 * Gets rank of neighborhood
 */
export function getRank(
  neighborhoodId: string,
  sortedNeighborhoods: NeighborhoodItem[]
): number {
  return sortedNeighborhoods.findIndex((n) => n.id === neighborhoodId) + 1;
}

/**
 * Gets card width based on tab and search state
 */
export function getCardWidth(
  activeTab: TabType,
  hasSearchQuery: boolean
): string {
  if (activeTab === 'all' && !hasSearchQuery) {
    return 'w-[350px]';
  }
  return 'w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]';
}
