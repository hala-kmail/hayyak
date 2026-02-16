'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';

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

const API_BASE = '/api/admin/admins';

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

export function useAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdmins = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        const msg = data.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل في جلب الأدمنز.');
        throw new Error(errorText);
      }

      const data = await response.json();
      setAdmins(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Error fetching admins:', err);
      setError(err.message || 'حدث خطأ في جلب الأدمنز.');
    } finally {
      setIsLoading(false);
    }
  };

  const createAdmin = async (adminData: CreateAdminData): Promise<Admin | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(adminData),
      });

      if (!response.ok) {
        const data = await response.json();
        const msg = data.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل في إضافة الأدمن.');
        throw new Error(errorText);
      }

      const newAdmin = await response.json();
      await fetchAdmins(); // Refresh list
      setIsLoading(false);
      return newAdmin;
    } catch (err: any) {
      console.error('Error creating admin:', err);
      const errorMessage = err.message || 'حدث خطأ في إضافة الأدمن.';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  const deleteAdmin = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        const msg = data.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل في حذف الأدمن.');
        throw new Error(errorText);
      }

      await fetchAdmins(); // Refresh list
      return true;
    } catch (err: any) {
      console.error('Error deleting admin:', err);
      setError(err.message || 'حدث خطأ في حذف الأدمن.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAdminStatus = async (id: string): Promise<Admin | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/${id}/toggle`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        const msg = data.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل في تبديل حالة الأدمن.');
        throw new Error(errorText);
      }

      const updatedAdmin = await response.json();
      await fetchAdmins(); // Refresh list
      setIsLoading(false);
      return updatedAdmin;
    } catch (err: any) {
      console.error('Error toggling admin status:', err);
      const errorMessage = err.message || 'حدث خطأ في تبديل حالة الأدمن.';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return {
    admins,
    isLoading,
    error,
    fetchAdmins,
    createAdmin,
    deleteAdmin,
    toggleAdminStatus,
  };
}
