import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_SESSION_COOKIE = 'admin_session';

/**
 * Middleware لحماية مسارات لوحة التحكم
 * يتحقق من وجود cookie الجلسة قبل السماح بالوصول لـ /admin (ما عدا /admin/login)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // مسارات الأدمن المحمية (ما عدا صفحة تسجيل الدخول)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const hasSession = request.cookies.has(ADMIN_SESSION_COOKIE);
    if (!hasSession) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
