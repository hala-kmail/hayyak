'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { API_BASE } from '@/lib/api';

export interface VisitorCountData {
  totalVisits: number;
  uniqueVisitors: number;
}

export function useVisitorCount() {
  const [uniqueVisitors, setUniqueVisitors] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const fetchVisitorCount = useCallback(async () => {
    if (isFetchingRef.current) {
      return; // منع الاستدعاء المزدوج
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/visitors/count`, {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error('فشل في جلب عدد الزوار.');
      }

      const data: VisitorCountData = await response.json();
      setUniqueVisitors(data.uniqueVisitors);
    } catch (err: any) {
      console.error('Error fetching visitor count:', err);
      setError(err.message || 'حدث خطأ في جلب عدد الزوار.');
      setUniqueVisitors(null);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchVisitorCount();
  }, [fetchVisitorCount]);

  return {
    uniqueVisitors,
    isLoading,
    error,
    refetch: fetchVisitorCount,
  };
}
