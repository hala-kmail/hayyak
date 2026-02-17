import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api';

// GET /api/towns/top-3 - جلب أفضل 3 أحياء حسب عدد الأصوات
export async function GET(request: NextRequest) {
  try {
    // جلب الأحياء من الـ API الخارجي
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
    
    // التأكد من أن كل حي يحتوي على votes
    const townsWithVotes = (Array.isArray(towns) ? towns : []).map((town: any) => {
      const votes = town.votes ?? 0;
      return {
        ...town,
        votes,
      };
    });

    // ترتيب الأحياء حسب عدد الأصوات (تنازلي) وأخذ أفضل 3
    const top3Towns = townsWithVotes
      .sort((a: any, b: any) => b.votes - a.votes)
      .slice(0, 3)
      .map((town: any, index: number) => ({
        rank: index + 1,
        townId: town.id || town.townId,
        name: town.name || town.townName,
        votes: town.votes || 0,
      }));

    return NextResponse.json(top3Towns);
  } catch (error: any) {
    console.error('Error fetching top 3 towns:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب أفضل 3 أحياء.' },
      { status: 500 }
    );
  }
}
