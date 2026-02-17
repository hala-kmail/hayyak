import { NextRequest, NextResponse } from 'next/server';
import { API_BASE, getServerAuthHeaders } from '@/lib/api';

// GET /api/admin/election/config - جلب إعدادات التصويت
export async function GET(request: NextRequest) {
  try {
    const headers = getServerAuthHeaders(request);
    
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
    const headers = getServerAuthHeaders(request);
    
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
