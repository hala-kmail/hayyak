'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { API_BASE } from '@/lib/api';

export interface StatsData {
  totalVotes: number;
  todayVotes: number;
  numberOfTowns: number;
  leadingTowns: Array<{
    townId: string;
    name: string;
    votes: number;
  }>;
}

export function useStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const fetchStats = useCallback(async () => {
    if (isFetchingRef.current) {
      return; // منع الاستدعاء المزدوج
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/stats`, {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error('فشل في جلب الإحصائيات.');
      }

      const data: StatsData = await response.json();
      setStats(data);
    } catch (err: any) {
      console.error('Error fetching stats:', err);
      setError(err.message || 'حدث خطأ في جلب الإحصائيات.');
      setStats(null);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
}
