import { NextRequest, NextResponse } from 'next/server';
import { API_BASE } from '@/lib/api';

// Timeout constant (8 seconds for external API)
const EXTERNAL_API_TIMEOUT = 8000;

/**
 * POST /api/votes
 * Submit a vote for a neighborhood
 * 
 * Request body:
 * {
 *   townId: string,
 *   fingerprint: string (visitorId from FingerprintJS)
 * }
 * 
 * يتم إرسال معلومات إضافية للباك إند للتحقق من التصويت المكرر:
 * - ipAddress: عنوان IP للعميل
 * - userAgent: معلومات المتصفح
 * - acceptLanguage: اللغة المفضلة
 * 
 * ملاحظة مهمة: الباك إند يجب أن يتحقق من:
 * 1. نفس fingerprint (نفس الجهاز/المتصفح)
 * 2. نفس IP Address (نفس الشبكة/الموقع)
 * 3. نفس User-Agent (نفس المتصفح)
 * 
 * يجب رفض التصويت إذا كان أي من هذه المعلومات متطابقة مع تصويت سابق.
 */

/**
 * Get client IP address from request
 * Handles various proxy headers (Vercel, Cloudflare, etc.)
 */
function getClientIP(request: NextRequest): string {
  // Vercel
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  if (vercelIP) {
    return vercelIP.split(',')[0].trim();
  }

  // Cloudflare
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) {
    return cfIP;
  }

  // Standard headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback - return unknown if no IP found
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { townId, fingerprint } = body;

    // Validate input
    if (!townId || typeof townId !== 'string') {
      return NextResponse.json(
        { error: 'townId is required and must be a string' },
        { status: 400 }
      );
    }

    if (!fingerprint || typeof fingerprint !== 'string') {
      return NextResponse.json(
        { error: 'Valid fingerprint is required' },
        { status: 400 }
      );
    }

    // جمع معلومات إضافية للتحقق من التصويت المكرر
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const acceptLanguage = request.headers.get('accept-language') || 'unknown';

    // إرسال التصويت للـ API الخارجي مع timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), EXTERNAL_API_TIMEOUT);

    try {
      const response = await fetch(`${API_BASE}/votes`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          townId,
          fingerprint,
          // إرسال معلومات إضافية للتحقق من التصويت المكرر
          ipAddress: clientIP,
          userAgent,
          acceptLanguage,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

    if (!response.ok) {
      // معالجة الأخطاء من الـ API
      const errorMessage = data.message || data.error || 'حدث خطأ أثناء التصويت. يرجى المحاولة لاحقاً.';
      
      // إذا كان الخطأ 409 (Conflict) - يعني تم التصويت مسبقاً
      if (response.status === 409) {
        return NextResponse.json(
          { error: 'لقد قمت بالتصويت مسبقاً .' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'تم التصويت بنجاح',
        townId,
        ...data
      },
      { status: response.status }
    );
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('External API timeout:', fetchError);
        return NextResponse.json(
          { error: 'انتهت مهلة الاتصال بالخادم. يرجى المحاولة مرة أخرى.' },
          { status: 504 }
        );
      }
      throw fetchError;
    }
  } catch (error: any) {
    console.error('Error processing vote:', error);
    
    return NextResponse.json(
      { error: 'حدث خطأ أثناء معالجة التصويت. يرجى المحاولة لاحقاً.' },
      { status: 500 }
    );
  }
}
