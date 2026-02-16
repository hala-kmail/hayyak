import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api';

async function getAuthHeaders(request: NextRequest): Promise<HeadersInit> {
  // الحصول على الـ token من الـ Authorization header
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

// GET /api/admin/towns - جلب جميع الأحياء
export async function GET(request: NextRequest) {
  try {
    const headers = await getAuthHeaders(request);
    
    const response = await fetch(`${API_BASE}/towns`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching towns:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الأحياء.' },
      { status: 500 }
    );
  }
}

// POST /api/admin/towns - إضافة حي جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const headers = await getAuthHeaders(request);
    
    const response = await fetch(`${API_BASE}/towns`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error creating town:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إضافة الحي.' },
      { status: 500 }
    );
  }
}
