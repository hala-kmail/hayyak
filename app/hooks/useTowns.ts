'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { API_BASE, getClientAuthHeaders } from '@/lib/api';

export interface Town {
  id: string;
  name: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
  votes?: number;
  percentage?: number;
}

export interface CreateTownData {
  name: string;
  address: string;
}

export interface UpdateTownData {
  name?: string;
  address?: string;
}

/** جلب الأحياء من الـ API - يمكن استدعاؤها من أي مكان */
export async function fetchTownsFromAPI(requireAuth = true): Promise<Town[]> {
  const url = `${API_BASE}/towns`;
  const headers = requireAuth
    ? getClientAuthHeaders()
    : {
        accept: '*/*',
        'Content-Type': 'application/json',
      };

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const data = await response.json();
    const msg = data.message;
    const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل في جلب الأحياء.');
    throw new Error(errorText);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export function useTowns() {
  const [towns, setTowns] = useState<Town[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const fetchTowns = useCallback(async () => {
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchTownsFromAPI(true);
      setTowns(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'حدث خطأ في جلب الأحياء.';
      console.error('Error fetching towns:', err);
      setError(message);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  const searchTowns = useCallback(async (query: string): Promise<void> => {
    if (!query || query.trim() === '') {
      await fetchTowns();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url = `${API_BASE}/towns/search?q=${encodeURIComponent(query)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        const msg = data.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل في البحث عن الأحياء.');
        throw new Error(errorText);
      }

      const data = await response.json();
      setTowns(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'حدث خطأ في البحث عن الأحياء.';
      console.error('Error searching towns:', err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTowns]);

  useEffect(() => {
    fetchTowns();
  }, [fetchTowns]);

  return {
    towns,
    isLoading,
    error,
    fetchTowns,
    searchTowns,
  };
}
