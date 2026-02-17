'use client';

import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // استخدام cache من المتصفح لتقليل الطلبات المتكررة
        const response = await fetch('/api/admin/election/status', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // استخدام cache لمدة 5 ثوانٍ لتقليل الطلبات المتكررة
          cache: 'default',
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
    };

    fetchStatus();
  }, []);

  return { status, isLoading, error };
}
