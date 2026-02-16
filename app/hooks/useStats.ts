'use client';

import { useState, useEffect } from 'react';

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

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api';
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
      console.log('Stats API response:', data);
      setStats(data);
    } catch (err: any) {
      console.error('Error fetching stats:', err);
      setError(err.message || 'حدث خطأ في جلب الإحصائيات.');
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
}
