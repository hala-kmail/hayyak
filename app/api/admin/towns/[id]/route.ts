import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api';

async function getAuthHeaders(request: NextRequest, includeContentType: boolean = true): Promise<HeadersInit> {
  // الحصول على الـ token من الـ Authorization header
  const authHeader = request.headers.get('authorization');
  const headers: HeadersInit = {
    'accept': '*/*',
  };
  
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }
  
  return headers;
}

// PATCH /api/admin/towns/[id] - تعديل حي
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const headers = await getAuthHeaders(request);
    
    const response = await fetch(`${API_BASE}/towns/${id}`, {
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
    console.error('Error updating town:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تعديل الحي.' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/towns/[id] - حذف حي
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // لا نرسل Content-Type في DELETE request
    const headers = await getAuthHeaders(request, false);
    
    const response = await fetch(`${API_BASE}/towns/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      let errorData: any;
      try {
        const text = await response.text();
        errorData = text ? JSON.parse(text) : {};
      } catch {
        errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
      }
      return NextResponse.json(errorData, { status: response.status });
    }

    // محاولة قراءة الـ response
    let responseData: any = { success: true };
    try {
      const text = await response.text();
      if (text) {
        responseData = JSON.parse(text);
      }
    } catch {
      // إذا فشل parsing، نستخدم القيمة الافتراضية
    }

    return NextResponse.json(responseData, { status: response.status });
  } catch (error: any) {
    console.error('Error deleting town:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في حذف الحي.' },
      { status: 500 }
    );
  }
}
