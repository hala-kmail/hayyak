import { NextRequest, NextResponse } from 'next/server';
import { API_BASE } from '@/lib/api';

// GET /api/election/status - جلب حالة التصويت (عام - للصفحة الرئيسية)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const headers: HeadersInit = {
      accept: '*/*',
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
      return NextResponse.json(
        { error: errorData.error || 'فشل في جلب حالة التصويت' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error: unknown) {
    console.error('Error fetching election status:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب حالة التصويت.' },
      { status: 500 }
    );
  }
}
