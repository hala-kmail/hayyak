import { NextRequest, NextResponse } from 'next/server';
import { API_BASE, getServerAuthHeaders } from '@/lib/api';

// PATCH /api/admin/admins/[id]/toggle - تبديل حالة الأدمن
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const headers = getServerAuthHeaders(request, { includeContentType: false });
    
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
