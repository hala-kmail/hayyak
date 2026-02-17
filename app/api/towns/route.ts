import { NextRequest, NextResponse } from 'next/server';
import { API_BASE } from '@/lib/api';

// GET /api/towns - جلب جميع الأحياء مع عدد الأصوات من API الخارجي
export async function GET(request: NextRequest) {
  try {
    // جلب الأحياء من الـ API الخارجي (يجب أن يعيد الأصوات مع كل حي)
    const response = await fetch(`${API_BASE}/towns`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'فشل في جلب الأحياء.' },
        { status: response.status }
      );
    }

    const towns = await response.json();
    
    // التأكد من أن كل حي يحتوي على votes (من API الخارجي)
    const townsWithVotes = (Array.isArray(towns) ? towns : []).map((town: any) => {
      // استخدام votes من API الخارجي إذا كان متوفراً، وإلا 0
      const votes = town.votes ?? 0;
      return {
        ...town,
        votes,
      };
    });

    return NextResponse.json(townsWithVotes);
  } catch (error: any) {
    console.error('Error fetching towns:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الأحياء.' },
      { status: 500 }
    );
  }
}
