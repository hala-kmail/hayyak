import { NextRequest, NextResponse } from 'next/server';
import { fetchElectionStatus } from '@/app/lib/electionStatus';

// GET /api/admin/election/status - جلب حالة التصويت
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const data = await fetchElectionStatus(authHeader);

    // تقليل الـ cache لضمان تحديث البيانات فوراً عند التغيير
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error: any) {
    console.error('Error fetching election status:', error);
    return NextResponse.json(
      { error: error.message || 'حدث خطأ في جلب حالة التصويت.' },
      { status: 500 }
    );
  }
}
