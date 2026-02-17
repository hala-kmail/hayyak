import { NextRequest, NextResponse } from 'next/server';
import { API_BASE, getServerAuthHeaders } from '@/lib/api';

// DELETE /api/admin/admins/[id] - حذف أدمن
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const headers = getServerAuthHeaders(request, { includeContentType: false });
    
    const response = await fetch(`${API_BASE}/auth/admins/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting admin:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في حذف الأدمن.' },
      { status: 500 }
    );
  }
}
