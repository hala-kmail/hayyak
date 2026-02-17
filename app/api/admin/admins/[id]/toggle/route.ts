import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api';

async function getAuthHeaders(request: NextRequest): Promise<HeadersInit> {
  const authHeader = request.headers.get('authorization');
  const headers: HeadersInit = {
    'accept': '*/*',
  };
  
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }
  
  return headers;
}

// PATCH /api/admin/admins/[id]/toggle - تبديل حالة الأدمن
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const headers = await getAuthHeaders(request);
    
    const response = await fetch(`${API_BASE}/auth/admins/${id}/toggle`, {
      method: 'PATCH',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error toggling admin status:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تبديل حالة الأدمن.' },
      { status: 500 }
    );
  }
}
