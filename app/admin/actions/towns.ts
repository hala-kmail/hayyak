'use server';

import { revalidatePath } from 'next/cache';
import { API_BASE, getServerAuthHeadersFromToken } from '@/lib/api';
import { getAdminTokenFromCookies } from '@/lib/server-auth';

export interface TownActionState {
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

export async function createTownAction(
  _prevState: TownActionState | null,
  formData: FormData
): Promise<TownActionState> {
  const token = await getAdminTokenFromCookies();
  if (!token) {
    return { error: 'يجب تسجيل الدخول أولاً' };
  }

  const name = (formData.get('name') as string)?.trim();
  const address = (formData.get('address') as string)?.trim();

  if (!name) {
    return { error: 'اسم الحي مطلوب' };
  }
  if (!address) {
    return { error: 'العنوان مطلوب' };
  }

  try {
    const response = await fetch(`${API_BASE}/towns`, {
      method: 'POST',
      headers: getServerAuthHeadersFromToken(token),
      body: JSON.stringify({ name, address }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { error: parseApiError(text, 'فشل في إضافة الحي') };
    }

    revalidatePath('/admin/towns');
    return { success: true };
  } catch (err: unknown) {
    console.error('Error creating town:', err);
    return { error: 'حدث خطأ في إضافة الحي' };
  }
}

export async function updateTownAction(
  _prevState: TownActionState | null,
  formData: FormData
): Promise<TownActionState> {
  const token = await getAdminTokenFromCookies();
  if (!token) {
    return { error: 'يجب تسجيل الدخول أولاً' };
  }

  const id = formData.get('id') as string;
  const name = (formData.get('name') as string)?.trim();
  const address = (formData.get('address') as string)?.trim();

  if (!id) {
    return { error: 'معرف الحي مطلوب' };
  }
  if (!name) {
    return { error: 'اسم الحي مطلوب' };
  }
  if (!address) {
    return { error: 'العنوان مطلوب' };
  }

  try {
    const response = await fetch(`${API_BASE}/towns/${id}`, {
      method: 'PATCH',
      headers: getServerAuthHeadersFromToken(token),
      body: JSON.stringify({ name, address }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { error: parseApiError(text, 'فشل في تعديل الحي') };
    }

    revalidatePath('/admin/towns');
    return { success: true };
  } catch (err: unknown) {
    console.error('Error updating town:', err);
    return { error: 'حدث خطأ في تعديل الحي' };
  }
}

export async function deleteTownAction(
  _prevState: TownActionState | null,
  formData: FormData
): Promise<TownActionState> {
  const token = await getAdminTokenFromCookies();
  if (!token) {
    return { error: 'يجب تسجيل الدخول أولاً' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'معرف الحي مطلوب' };
  }

  try {
    const response = await fetch(`${API_BASE}/towns/${id}`, {
      method: 'DELETE',
      headers: getServerAuthHeadersFromToken(token, { includeContentType: false }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { error: parseApiError(text, 'فشل في حذف الحي') };
    }

    revalidatePath('/admin/towns');
    return { success: true };
  } catch (err: unknown) {
    console.error('Error deleting town:', err);
    return { error: 'حدث خطأ في حذف الحي' };
  }
}
