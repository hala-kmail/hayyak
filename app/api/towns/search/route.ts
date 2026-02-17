import { NextRequest, NextResponse } from 'next/server';
import { API_BASE } from '@/lib/api';

// GET /api/towns/search?q=query - البحث عن الأحياء
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'يجب إدخال نص البحث' },
        { status: 400 }
      );
    }

    // البحث عن الأحياء من الـ API الخارجي
    const response = await fetch(`${API_BASE}/towns/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'فشل في البحث عن الأحياء.' },
        { status: response.status }
      );
    }

    const towns = await response.json();
    
    // التأكد من أن كل حي يحتوي على votes و percentage
    const townsWithVotes = (Array.isArray(towns) ? towns : []).map((town: any) => {
      const votes = town.votes ?? 0;
      return {
        ...town,
        votes,
        // الحفاظ على percentage من الاستجابة الأصلية
        percentage: town.percentage,
      };
    });

    return NextResponse.json(townsWithVotes);
  } catch (error: any) {
    console.error('Error searching towns:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في البحث عن الأحياء.' },
      { status: 500 }
    );
  }
}
