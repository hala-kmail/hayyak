import { API_BASE } from '@/lib/api';

export interface ElectionStatus {
  isOpen: boolean;
  mode: 'manual' | 'scheduled';
  timezone?: string;
  startAt?: string | null;
  endAt?: string | null;
}

// Server-side function
export async function fetchElectionStatus(authHeader?: string | null): Promise<ElectionStatus> {
  const headers: HeadersInit = {
    'accept': '*/*',
    'Content-Type': 'application/json',
  };
  
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }
  
  const response = await fetch(`${API_BASE}/election/status`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'فشل في جلب حالة التصويت');
  }

  const data = await response.json();
  return data;
}

// Client-side function - calls backend directly
export async function fetchElectionStatusFromAPI(): Promise<ElectionStatus> {
  const response = await fetch(`${API_BASE}/election/status?t=${Date.now()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('فشل في جلب حالة التصويت');
  }

  const data = await response.json();
  return data;
}
