import { NextRequest, NextResponse } from 'next/server';
import { API_BASE } from '@/lib/api';

// GET /api/stats - جلب إحصائيات التصويت من API الخارجي
export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_BASE}/stats`, {
      method: 'GET',
      headers: {
        accept: '*/*',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'فشل في جلب الإحصائيات.' },
        { status: response.status }
      );
    }

    const stats = await response.json();
    return NextResponse.json(stats);
  } catch (error: unknown) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الإحصائيات.' },
      { status: 500 }
    );
  }
}
