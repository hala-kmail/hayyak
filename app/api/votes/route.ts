import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api';

/**
 * POST /api/votes
 * Submit a vote for a neighborhood
 * 
 * Request body:
 * {
 *   townId: string,
 *   fingerprint: string (visitorId from FingerprintJS)
 * }
 */
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

    // إرسال التصويت للـ API الخارجي
    const response = await fetch(`${API_BASE}/votes`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        townId,
        fingerprint,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // معالجة الأخطاء من الـ API
      const errorMessage = data.message || data.error || 'حدث خطأ أثناء التصويت. يرجى المحاولة لاحقاً.';
      
      // إذا كان الخطأ 409 (Conflict) - يعني تم التصويت مسبقاً
      if (response.status === 409) {
        return NextResponse.json(
          { error: 'لقد قمت بالتصويت مسبقاً من هذا الجهاز.' },
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
  } catch (error: any) {
    console.error('Error processing vote:', error);
    
    return NextResponse.json(
      { error: 'حدث خطأ أثناء معالجة التصويت. يرجى المحاولة لاحقاً.' },
      { status: 500 }
    );
  }
}
