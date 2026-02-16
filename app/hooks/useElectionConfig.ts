'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';

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

const API_BASE = '/api/admin/election';

function getAuthHeaders(): HeadersInit {
  const token = getAccessToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

export function useElectionConfig() {
  const [config, setConfig] = useState<ElectionConfig | null>(null);
  const [status, setStatus] = useState<ElectionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/config`, {
        method: 'GET',
        headers: getAuthHeaders(),
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
    }
  };

  const fetchStatus = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/status`, {
        method: 'GET',
        headers: getAuthHeaders(),
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
    }
  };

  const updateConfig = async (configData: UpdateElectionConfigData): Promise<ElectionConfig | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/config`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
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

  const refresh = async () => {
    await Promise.all([fetchConfig(), fetchStatus()]);
  };

  useEffect(() => {
    refresh();
  }, []);

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
