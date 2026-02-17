'use client';

import { useStats } from '@/app/hooks/useStats';
import { useTop3Towns } from '@/app/hooks/useTop3Towns';

/**
 * useAdminStats Hook
 * Following Single Responsibility Principle - aggregates stats data for admin dashboard
 * Following Dependency Inversion - depends on useStats and useTop3Towns abstractions
 */
export function useAdminStats() {
  const statsResult = useStats();
  const top3Result = useTop3Towns();

  const isLoading = statsResult.isLoading;
  const error = statsResult.error;

  return {
    stats: statsResult.stats,
    top3Towns: top3Result.top3Towns,
    isLoading,
    error,
    top3Loading: top3Result.isLoading,
    top3Error: top3Result.error,
  };
}
