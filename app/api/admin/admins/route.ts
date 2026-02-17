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

// GET /api/admin/admins - جلب جميع مسؤولين النظام
export async function GET(request: NextRequest) {
  try {
    const headers = await getAuthHeaders(request);
    
    const response = await fetch(`${API_BASE}/auth/admins`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب مسؤولين النظام.' },
      { status: 500 }
    );
  }
}

// POST /api/admin/admins - إضافة أدمن جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const headers = await getAuthHeaders(request);
    
    const response = await fetch(`${API_BASE}/auth/admins`, {
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
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إضافة الأدمن.' },
      { status: 500 }
    );
  }
}
