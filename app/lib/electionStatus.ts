const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api';

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

// Client-side function - uses API route
export async function fetchElectionStatusFromAPI(): Promise<ElectionStatus> {
  const response = await fetch(`/api/admin/election/status?t=${Date.now()}`, {
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
