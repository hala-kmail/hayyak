import {
  API_BASE,
  getServerAuthHeaders,
  getServerAuthHeadersFromToken,
  getClientAuthHeaders,
} from '@/lib/api';

export interface VisitorByDay {
  date: string;
  visits: number;
  uniqueVisitors: number;
}

export interface VisitorByCountry {
  countryCode: string;
  visits: number;
  uniqueVisitors: number;
}

export interface AdminVisitorStatsData {
  uniqueVisitors: number;
  totalVisits?: number; // موجود من الـ API لكن لا نعرضه
  totalVotes?: number;
  visitorsToVotersPercentage?: number;
  nonVotingVisitors?: number;
  nonVotingVisitorsPercentage?: number;
  visitorsByCountry?: VisitorByCountry[];
  visitorsByDay?: VisitorByDay[];
}

/** تطبيق قواعد days: لا param = 7، max 90، min 1 */
export function normalizeDays(days?: number | string | null): number {
  if (days == null || days === '') {
    return 7;
  }
  const n = Number(days);
  if (Number.isNaN(n) || n < 1) {
    return 1;
  }
  return Math.min(n, 90);
}

async function fetchStats(url: string, headers: HeadersInit): Promise<AdminVisitorStatsData> {
  const response = await fetch(url, { method: 'GET', headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'فشل في جلب إحصائيات الزوار.');
  }
  return data;
}

/** جلب إحصائيات الزوار - للاستخدام من API route */
export async function fetchAdminVisitorStats(
  days: number | string | null | undefined,
  request: { headers: { get: (name: string) => string | null } }
): Promise<AdminVisitorStatsData> {
  const normalized = normalizeDays(days);
  const url = `${API_BASE}/admin/visitors/stats?days=${normalized}`;
  const headers = getServerAuthHeaders(request);
  return fetchStats(url, headers);
}

/** جلب إحصائيات الزوار - للاستخدام من Server Component (مع التوكن من الكوكيز) */
export async function fetchAdminVisitorStatsFromServer(
  days: number | string | null | undefined,
  token: string | null
): Promise<AdminVisitorStatsData> {
  const normalized = normalizeDays(days);
  const url = `${API_BASE}/admin/visitors/stats?days=${normalized}`;
  const headers = getServerAuthHeadersFromToken(token);
  return fetchStats(url, headers);
}

/** جلب إحصائيات الزوار - للاستخدام من الـ Client (رابط الباك إند مباشرة) */
export async function fetchAdminVisitorStatsFromClient(
  days: number | string | null | undefined
): Promise<AdminVisitorStatsData> {
  const normalized = normalizeDays(days);
  const url = `${API_BASE}/admin/visitors/stats?days=${normalized}`;
  const headers = getClientAuthHeaders();
  return fetchStats(url, headers);
}
