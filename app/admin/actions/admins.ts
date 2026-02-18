'use server';

import { revalidatePath } from 'next/cache';
import { API_BASE, getServerAuthHeadersFromToken } from '@/lib/api';
import { getAdminTokenFromCookies } from '@/lib/server-auth';

export interface AdminActionState {
  success?: boolean;
  error?: string;
}

function parseApiError(text: string, fallback: string): string {
  try {
    const data = text ? JSON.parse(text) : {};
    const msg = data.message;
    return Array.isArray(msg) ? msg.join(' ') : (msg || data.error || fallback);
  } catch {
    return fallback;
  }
}

export async function createAdminAction(
  _prevState: AdminActionState | null,
  formData: FormData
): Promise<AdminActionState> {
  const token = await getAdminTokenFromCookies();
  if (!token) {
    return { error: 'يجب تسجيل الدخول أولاً' };
  }

  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;

  if (!name) {
    return { error: 'الاسم مطلوب' };
  }
  if (!email) {
    return { error: 'البريد الإلكتروني مطلوب' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'يرجى إدخال بريد إلكتروني صحيح' };
  }
  if (!password || password.length < 6) {
    return { error: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' };
  }

  try {
    const response = await fetch(`${API_BASE}/auth/admins`, {
      method: 'POST',
      headers: getServerAuthHeadersFromToken(token),
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { error: parseApiError(text, 'فشل في إضافة الأدمن') };
    }

    revalidatePath('/admin/admins');
    return { success: true };
  } catch (err: unknown) {
    console.error('Error creating admin:', err);
    return { error: 'حدث خطأ في إضافة الأدمن' };
  }
}

export async function deleteAdminAction(
  _prevState: AdminActionState | null,
  formData: FormData
): Promise<AdminActionState> {
  const token = await getAdminTokenFromCookies();
  if (!token) {
    return { error: 'يجب تسجيل الدخول أولاً' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'معرف الأدمن مطلوب' };
  }

  try {
    const response = await fetch(`${API_BASE}/auth/admins/${id}`, {
      method: 'DELETE',
      headers: getServerAuthHeadersFromToken(token, { includeContentType: false }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { error: parseApiError(text, 'فشل في حذف الأدمن') };
    }

    revalidatePath('/admin/admins');
    return { success: true };
  } catch (err: unknown) {
    console.error('Error deleting admin:', err);
    return { error: 'حدث خطأ في حذف الأدمن' };
  }
}

export async function toggleAdminAction(
  _prevState: AdminActionState | null,
  formData: FormData
): Promise<AdminActionState> {
  const token = await getAdminTokenFromCookies();
  if (!token) {
    return { error: 'يجب تسجيل الدخول أولاً' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'معرف الأدمن مطلوب' };
  }

  try {
    const response = await fetch(`${API_BASE}/auth/admins/${id}/toggle`, {
      method: 'PATCH',
      headers: getServerAuthHeadersFromToken(token, { includeContentType: false }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { error: parseApiError(text, 'فشل في تبديل حالة الأدمن') };
    }

    revalidatePath('/admin/admins');
    return { success: true };
  } catch (err: unknown) {
    console.error('Error toggling admin:', err);
    return { error: 'حدث خطأ في تبديل حالة الأدمن' };
  }
}
