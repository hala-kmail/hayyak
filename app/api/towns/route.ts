import { NextRequest, NextResponse } from 'next/server';
import { getVoteCount } from '@/lib/db';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api';

// GET /api/towns - جلب جميع الأحياء مع عدد الأصوات
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
    
    // جلب عدد الأصوات لكل حي من قاعدة البيانات المحلية
    const townsWithVotes = await Promise.all(
      (Array.isArray(towns) ? towns : []).map(async (town: any) => {
        try {
          const votes = await getVoteCount(town.id);
          return {
            ...town,
            votes,
          };
        } catch (error) {
          console.error(`Error getting votes for town ${town.id}:`, error);
          return {
            ...town,
            votes: 0,
          };
        }
      })
    );

    return NextResponse.json(townsWithVotes);
  } catch (error: any) {
    console.error('Error fetching towns:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الأحياء.' },
      { status: 500 }
    );
  }
}
