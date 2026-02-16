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

// GET /api/admin/election/config - جلب إعدادات التصويت
export async function GET(request: NextRequest) {
  try {
    const headers = await getAuthHeaders(request);
    
    const response = await fetch(`${API_BASE}/election/config`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching election config:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب إعدادات التصويت.' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/election/config - تحديث إعدادات التصويت
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const headers = await getAuthHeaders(request);
    
    const response = await fetch(`${API_BASE}/election/config`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error updating election config:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث إعدادات التصويت.' },
      { status: 500 }
    );
  }
}
