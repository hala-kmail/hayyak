'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { API_BASE, getClientAuthHeaders } from '@/lib/api';

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  isActive: boolean;
  createdAt: string;
}

export interface CreateAdminData {
  name: string;
  email: string;
  password: string;
}

export function useAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const fetchAdmins = useCallback(async () => {
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/auth/admins`, {
        method: 'GET',
        headers: getClientAuthHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        const msg = data.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل في جلب مسؤولين النظام.');
        throw new Error(errorText);
      }

      const data = await response.json();
      setAdmins(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'حدث خطأ في جلب مسؤولين النظام.';
      console.error('Error fetching admins:', err);
      setError(message);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  return {
    admins,
    isLoading,
    error,
    fetchAdmins,
  };
}
