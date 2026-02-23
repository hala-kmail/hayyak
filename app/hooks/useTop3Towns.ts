'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchTop3TownsFromAPI, type Top3Town } from '@/app/lib/top3Towns';
import { isMockDataEnabled, MOCK_TOP3 } from '@/lib/mockData';

export type { Top3Town };

export function useTop3Towns() {
  const [top3Towns, setTop3Towns] = useState<Top3Town[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const fetchTop3Towns = useCallback(async () => {
    if (isFetchingRef.current) {
      return; // منع الاستدعاء المزدوج
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      if (isMockDataEnabled()) {
        setTop3Towns(MOCK_TOP3 as Top3Town[]);
        return;
      }
      const data = await fetchTop3TownsFromAPI();
      setTop3Towns(data);
    } catch (err: any) {
      console.error('Error fetching top 3 towns:', err);
      setError(err.message || 'حدث خطأ في جلب أفضل 3 أحياء.');
      setTop3Towns([]);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchTop3Towns();
  }, [fetchTop3Towns]);

  return {
    top3Towns,
    isLoading,
    error,
    refetch: fetchTop3Towns,
  };
}
