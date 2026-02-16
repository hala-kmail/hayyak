'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';

export interface Town {
  id: string;
  name: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
  votes?: number;
 
}

export interface CreateTownData {
  name: string;
  address: string;
}

export interface UpdateTownData {
  name?: string;
  address?: string;
}

// استخدام الرابط المباشر للـ API الخارجي
const API_BASE = 'https://api-sakani-election.orapexdev.com/api';
console.log('API_BASE configured as:', API_BASE);

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

// دالة منفصلة لجلب الأحياء من الـ API - يمكن استدعاؤها من أي مكان
export async function fetchTownsFromAPI(requireAuth = true): Promise<Town[]> {
  const url = `${API_BASE}/towns`;
  console.log('Fetching towns from:', url);
  
  const headers = requireAuth ? getAuthHeaders() : {
    'accept': '*/*',
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
  console.log('Response data:', data);
  return Array.isArray(data) ? data : [];
}

export function useTowns() {
  const [towns, setTowns] = useState<Town[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTowns = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchTownsFromAPI(true);
      setTowns(data);
    } catch (err: any) {
      console.error('Error fetching towns:', err);
      setError(err.message || 'حدث خطأ في جلب الأحياء.');
    } finally {
      setIsLoading(false);
    }
  };

  const createTown = async (townData: CreateTownData): Promise<Town | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${API_BASE}/towns`;
      const headers = getAuthHeaders();
      const body = JSON.stringify(townData);
      
      console.log('Creating town:', { url, townData });

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });

      console.log('Response status:', response.status, response.statusText);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        let errorData: any;
        try {
          const text = await response.text();
          errorData = text ? JSON.parse(text) : {};
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        
        const msg = errorData.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || errorData.error || `فشل في إضافة الحي. (${response.status})`);
        const error = new Error(errorText);
        setError(errorText);
        setIsLoading(false);
        throw error;
      }

      // قراءة الـ response
      let newTown: Town;
      try {
        const text = await response.text();
        if (text) {
          newTown = JSON.parse(text);
        } else {
          throw new Error('الاستجابة فارغة من الخادم.');
        }
      } catch (parseError) {
        console.error('Parse error:', parseError);
        throw new Error('فشل في قراءة الاستجابة من الخادم.');
      }

      await fetchTowns(); // Refresh list
      setIsLoading(false);
      return newTown;
    } catch (err: any) {
      console.error('Error creating town:', err);
      const errorMessage = err.message || 'حدث خطأ في إضافة الحي.';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  const updateTown = async (id: string, townData: UpdateTownData): Promise<Town | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${API_BASE}/towns/${id}`;
      const headers = getAuthHeaders();
      const body = JSON.stringify(townData);
      
      console.log('Updating town:', { url, id, townData });

      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body,
      });

      console.log('Response status:', response.status, response.statusText);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        let errorData: any;
        try {
          const text = await response.text();
          errorData = text ? JSON.parse(text) : {};
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        
        const msg = errorData.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || errorData.error || `فشل في تعديل الحي. (${response.status})`);
        const error = new Error(errorText);
        setError(errorText);
        setIsLoading(false);
        throw error;
      }

      // قراءة الـ response
      let updatedTown: Town;
      try {
        const text = await response.text();
        if (text) {
          updatedTown = JSON.parse(text);
        } else {
          // إذا كانت الاستجابة فارغة، نعيد البيانات المرسلة
          updatedTown = { id, ...townData } as Town;
        }
      } catch (parseError) {
        console.error('Parse error:', parseError);
        // إذا فشل parsing، نعيد البيانات المرسلة
        updatedTown = { id, ...townData } as Town;
      }

      await fetchTowns(); // Refresh list
      setIsLoading(false);
      return updatedTown;
    } catch (err: any) {
      console.error('Error updating town:', err);
      const errorMessage = err.message || 'حدث خطأ في تعديل الحي.';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  const deleteTown = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/towns/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        const msg = data.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل في حذف الحي.');
        throw new Error(errorText);
      }

      await fetchTowns(); // Refresh list
      return true;
    } catch (err: any) {
      console.error('Error deleting town:', err);
      setError(err.message || 'حدث خطأ في حذف الحي.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTowns();
  }, []);

  return {
    towns,
    isLoading,
    error,
    fetchTowns,
    createTown,
    updateTown,
    deleteTown,
  };
}
