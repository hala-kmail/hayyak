'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchElectionStatus, type ElectionStatus } from '@/app/lib/electionStatus';

export type { ElectionStatus };

export function useElectionStatus() {
  const [status, setStatus] = useState<ElectionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialLoadRef = useRef(true);

  const fetchStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchElectionStatus();
      setStatus(data);
      // بعد التحميل الأول، لا نعد هذا تحميلاً أولياً
      if (isInitialLoadRef.current) {
        isInitialLoadRef.current = false;
        setIsInitialLoad(false);
      }
    } catch (err: any) {
      console.error('Error fetching election status:', err);
      setError(err.message || 'حدث خطأ في جلب حالة التصويت.');
      // في حالة الخطأ، افترض أن التصويت مغلق
      setStatus({ isOpen: false, mode: 'manual' });
      if (isInitialLoadRef.current) {
        isInitialLoadRef.current = false;
        setIsInitialLoad(false);
      }
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

  return { status, isLoading, isInitialLoad, error, refetch: fetchStatus };
}
