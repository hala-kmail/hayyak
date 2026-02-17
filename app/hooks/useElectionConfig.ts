'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { API_BASE, getClientAuthHeaders } from '@/lib/api';

export interface ElectionConfig {
  id: string;
  mode: 'manual' | 'scheduled';
  manualOpen: boolean;
  startAt: string | null;
  endAt: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ElectionStatus {
  isOpen: boolean;
  mode: 'manual' | 'scheduled';
  timezone: string;
  startAt: string | null;
  endAt: string | null;
}

export interface UpdateElectionConfigData {
  mode?: 'manual' | 'scheduled';
  manualOpen?: boolean;
  startAt?: string | null;
  endAt?: string | null;
}

export function useElectionConfig() {
  const [config, setConfig] = useState<ElectionConfig | null>(null);
  const [status, setStatus] = useState<ElectionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingConfigRef = useRef(false);
  const isFetchingStatusRef = useRef(false);

  const fetchConfig = useCallback(async () => {
    if (isFetchingConfigRef.current) {
      return; // منع الاستدعاء المزدوج
    }

    isFetchingConfigRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/election/config`, {
        method: 'GET',
        headers: getClientAuthHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        const msg = data.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل في جلب إعدادات التصويت.');
        throw new Error(errorText);
      }

      const data = await response.json();
      setConfig(data);
    } catch (err: any) {
      console.error('Error fetching election config:', err);
      setError(err.message || 'حدث خطأ في جلب إعدادات التصويت.');
    } finally {
      setIsLoading(false);
      isFetchingConfigRef.current = false;
    }
  }, []);

  const fetchStatus = useCallback(async () => {
    if (isFetchingStatusRef.current) {
      return; // منع الاستدعاء المزدوج
    }

    isFetchingStatusRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/election/status`, {
        method: 'GET',
        headers: getClientAuthHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        const msg = data.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل في جلب حالة التصويت.');
        throw new Error(errorText);
      }

      const data = await response.json();
      setStatus(data);
    } catch (err: any) {
      console.error('Error fetching election status:', err);
      setError(err.message || 'حدث خطأ في جلب حالة التصويت.');
    } finally {
      setIsLoading(false);
      isFetchingStatusRef.current = false;
    }
  }, []);

  const updateConfig = async (configData: UpdateElectionConfigData): Promise<ElectionConfig | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/election/config`, {
        method: 'PATCH',
        headers: getClientAuthHeaders(),
        body: JSON.stringify(configData),
      });

      if (!response.ok) {
        const data = await response.json();
        const msg = data.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل في تحديث إعدادات التصويت.');
        throw new Error(errorText);
      }

      const updatedConfig = await response.json();
      setConfig(updatedConfig);
      
      // إعادة جلب الحالة بعد التحديث
      await fetchStatus();
      
      setIsLoading(false);
      return updatedConfig;
    } catch (err: any) {
      console.error('Error updating election config:', err);
      const errorMessage = err.message || 'حدث خطأ في تحديث إعدادات التصويت.';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  const refresh = useCallback(async () => {
    await Promise.all([fetchConfig(), fetchStatus()]);
  }, [fetchConfig, fetchStatus]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    config,
    status,
    isLoading,
    error,
    fetchConfig,
    fetchStatus,
    updateConfig,
    refresh,
  };
}
