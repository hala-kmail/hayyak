/**
 * دوال المصادقة للاستخدام على السيرفر (Server Actions, API Routes)
 * تقرأ التوكن من الكوكيز التي يتم تعيينها عند تسجيل الدخول
 */

import { cookies } from 'next/headers';

const ADMIN_TOKEN_COOKIE = 'admin_token';

/**
 * الحصول على توكن الأدمن من الكوكيز
 * للاستخدام في Server Actions
 */
export async function getAdminTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(ADMIN_TOKEN_COOKIE);
  if (!tokenCookie?.value) {
    return null;
  }
  try {
    return decodeURIComponent(tokenCookie.value);
  } catch {
    return null;
  }
}
