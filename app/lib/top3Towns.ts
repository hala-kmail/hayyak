import { API_BASE } from '@/lib/api';

export interface Top3Town {
  rank: number;
  townId: string;
  name: string;
  votes: number;
}

// Server-side function
export async function fetchTop3Towns(): Promise<Top3Town[]> {
  const response = await fetch(`${API_BASE}/towns/top-3`, {
    method: 'GET',
    headers: {
      'accept': '*/*',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'فشل في جلب أفضل 3 أحياء');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

// Client-side function - calls external API directly
export async function fetchTop3TownsFromAPI(): Promise<Top3Town[]> {
  const response = await fetch(`${API_BASE}/towns/top-3`, {
    method: 'GET',
    headers: {
      'accept': '*/*',
    },
  });

  if (!response.ok) {
    throw new Error('فشل في جلب أفضل 3 أحياء');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
