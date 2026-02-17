/**
 * Utility functions for NeighborhoodCard component
 * Following Single Responsibility Principle - only contains business logic
 */

import type { NeighborhoodItem } from '../../data';

/**
 * Calculates progress percentage for a neighborhood
 */
export function calculateProgress(
  neighborhood: NeighborhoodItem,
  totalVotes: number
): number {
  const votes = neighborhood.votes ?? 0;
  return totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
}

/**
 * Gets votes count for a neighborhood
 */
export function getVotes(neighborhood: NeighborhoodItem): number {
  return neighborhood.votes ?? 0;
}
