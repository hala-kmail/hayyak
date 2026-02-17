/**
 * Date formatting utilities for admin
 * Following Single Responsibility Principle - only handles date formatting
 */

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTimeLocal(dateString: string | null): string {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
}

export function parseDateTimeLocal(dateString: string): string | null {
  if (!dateString) {
    return null;
  }
  return new Date(dateString).toISOString();
}

export function formatDateTimeAr(
  dateString: string,
  options?: { timezone?: string }
): string {
  const date = new Date(dateString);
  return date.toLocaleString('ar-SA', {
    timeZone: options?.timezone,
    dateStyle: 'full',
    timeStyle: 'short',
  });
}
