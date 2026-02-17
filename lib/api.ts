/**
 * إعدادات API المركزية
 * يقلل التكرار ويضمن استخدام نفس القيم في كل المشروع
 */

import { getAccessToken } from '@/lib/auth';

const DEFAULT_API_URL = 'https://api-sakani-election.orapexdev.com/api';

/** عنوان الـ API الأساسي - يُستخدم في Server و Client */
export const API_BASE =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) ||
  DEFAULT_API_URL;

/**
 * إنشاء Headers للطلبات من الـ Client (مع التوكن من localStorage)
 * للاستخدام في hooks و components
 */
export function getClientAuthHeaders(): HeadersInit {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    accept: '*/*',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * إنشاء Headers للطلبات من الـ Server (من request)
 * للاستخدام في API routes
 */
export function getServerAuthHeaders(
  request: { headers: { get: (name: string) => string | null } },
  options?: { includeContentType?: boolean }
): HeadersInit {
  const authHeader = request.headers.get('authorization');
  const headers: Record<string, string> = {
    accept: '*/*',
  };
  if (options?.includeContentType !== false) {
    headers['Content-Type'] = 'application/json';
  }
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }
  return headers;
}
