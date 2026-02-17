'use client';

import { useState, useEffect } from 'react';

export interface Top3Town {
  rank: number;
  townId: string;
  name: string;
  votes: number;
}

export function useTop3Towns() {
  const [top3Towns, setTop3Towns] = useState<Top3Town[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTop3Towns = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/towns/top-3', {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error('فشل في جلب أفضل 3 أحياء.');
      }

      const data: Top3Town[] = await response.json();
      setTop3Towns(data);
    } catch (err: any) {
      console.error('Error fetching top 3 towns:', err);
      setError(err.message || 'حدث خطأ في جلب أفضل 3 أحياء.');
      setTop3Towns([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTop3Towns();
  }, []);

  return {
    top3Towns,
    isLoading,
    error,
    refetch: fetchTop3Towns,
  };
}
