import { NextRequest, NextResponse } from 'next/server';
import { fetchTop3Towns } from '@/app/lib/top3Towns';

// GET /api/towns/top-3 - جلب أفضل 3 أحياء حسب عدد الأصوات من API الخارجي
export async function GET(request: NextRequest) {
  try {
    const top3Towns = await fetchTop3Towns();
    
    return NextResponse.json(top3Towns, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error: any) {
    console.error('Error fetching top 3 towns:', error);
    return NextResponse.json(
      { error: error.message || 'حدث خطأ في جلب أفضل 3 أحياء.' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  }
}
