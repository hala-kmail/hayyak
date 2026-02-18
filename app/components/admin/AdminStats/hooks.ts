'use client';

import { useState } from 'react';
import { useStats } from '@/app/hooks/useStats';
import { useTop3Towns } from '@/app/hooks/useTop3Towns';
import { useAdminVisitorStats } from '@/app/hooks/useAdminVisitorStats';

/**
 * useAdminStats Hook
 * Following Single Responsibility Principle - aggregates stats data for admin dashboard
 */
export function useAdminStats() {
  const [visitorDays, setVisitorDays] = useState(14);
  const statsResult = useStats();
  const top3Result = useTop3Towns();
  const visitorStatsResult = useAdminVisitorStats(visitorDays);

  return {
    stats: statsResult.stats,
    top3Towns: top3Result.top3Towns,
    isLoading: statsResult.isLoading,
    error: statsResult.error,
    top3Loading: top3Result.isLoading,
    top3Error: top3Result.error,
    visitorStats: visitorStatsResult.stats,
    visitorStatsLoading: visitorStatsResult.isLoading,
    visitorStatsError: visitorStatsResult.error,
    visitorDays,
    setVisitorDays,
  };
}
