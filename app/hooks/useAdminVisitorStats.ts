'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  fetchAdminVisitorStatsFromClient,
  normalizeDays,
  type AdminVisitorStatsData,
} from '@/app/lib/adminVisitorStats';

export type { AdminVisitorStatsData, VisitorByDay, VisitorByCountry } from '@/app/lib/adminVisitorStats';

export function useAdminVisitorStats(days: number = 7) {
  const [stats, setStats] = useState<AdminVisitorStatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const fetchStats = useCallback(async () => {
    if (isFetchingRef.current) {
      return;
    }
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAdminVisitorStatsFromClient(days);
      setStats(data);
    } catch (err: any) {
      console.error('Error fetching admin visitor stats:', err);
      setError(err.message || 'حدث خطأ في جلب إحصائيات الزوار.');
      setStats(null);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [days]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
    days: normalizeDays(days),
  };
}
