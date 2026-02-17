'use client';

import { useState, useEffect, useCallback } from 'react';

export interface ElectionStatus {
  isOpen: boolean;
  mode: 'manual' | 'scheduled';
  timezone?: string;
  startAt?: string | null;
  endAt?: string | null;
}

export function useElectionStatus() {
  const [status, setStatus] = useState<ElectionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // استخدام timestamp لتجنب الـ cache وضمان الحصول على أحدث البيانات
      const response = await fetch(`/api/admin/election/status?t=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // إزالة الـ cache لضمان الحصول على أحدث البيانات
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('فشل في جلب حالة التصويت');
      }

      const data = await response.json();
      setStatus(data);
    } catch (err: any) {
      console.error('Error fetching election status:', err);
      setError(err.message || 'حدث خطأ في جلب حالة التصويت.');
      // في حالة الخطأ، افترض أن التصويت مغلق
      setStatus({ isOpen: false, mode: 'manual' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();

    // إعادة جلب البيانات تلقائياً كل 5 ثوانٍ للتأكد من تحديث الحالة
    const interval = setInterval(() => {
      fetchStatus();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchStatus]);

  return { status, isLoading, error, refetch: fetchStatus };
}
