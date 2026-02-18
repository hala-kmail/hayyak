import { NextRequest, NextResponse } from 'next/server';
import { fetchAdminVisitorStats } from '@/app/lib/adminVisitorStats';

// GET /api/admin/visitors/stats?days=14 - جلب إحصائيات الزوار للأدمن
export async function GET(request: NextRequest) {
  try {
    const days = request.nextUrl.searchParams.get('days');
    const data = await fetchAdminVisitorStats(days, request);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error fetching admin visitor stats:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب إحصائيات الزوار.' },
      { status: 500 }
    );
  }
}
