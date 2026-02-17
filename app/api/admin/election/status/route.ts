import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api';

async function getAuthHeaders(request: NextRequest): Promise<HeadersInit> {
  const authHeader = request.headers.get('authorization');
  const headers: HeadersInit = {
    'accept': '*/*',
    'Content-Type': 'application/json',
  };
  
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }
  
  return headers;
}

// GET /api/admin/election/status - جلب حالة التصويت
export async function GET(request: NextRequest) {
  try {
    const headers = await getAuthHeaders(request);
    
    const response = await fetch(`${API_BASE}/election/status`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // إضافة cache headers للاستجابة - يتم تحديث البيانات كل 10 ثوانٍ
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
      },
    });
  } catch (error: any) {
    console.error('Error fetching election status:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب حالة التصويت.' },
      { status: 500 }
    );
  }
}
