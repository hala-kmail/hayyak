'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { API_BASE, getClientAuthHeaders } from '@/lib/api';

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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialLoadRef = useRef(true);
  const isFetchingRef = useRef(false);

  const fetchStatus = useCallback(async () => {
    if (isFetchingRef.current) {
      return; // منع الاستدعاء المزدوج
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/election/status`, {
        method: 'GET',
        headers: getClientAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'فشل في جلب حالة التصويت');
      }

      const data: ElectionStatus = await response.json();
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
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchStatus();

    // إعادة جلب البيانات تلقائياً كل 30 ثانية بدلاً من 10 لتقليل الحمل على الخادم
    const interval = setInterval(() => {
      fetchStatus();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchStatus]);

  return { status, isLoading, isInitialLoad, error, refetch: fetchStatus };
}
