/**
 * Date manipulation and formatting utilities
 */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

/**
 * formatDate - Format date to a readable string
 * 
 * @example
 * ```tsx
 * formatDate(new Date(), 'YYYY-MM-DD') // "2025-10-27"
 * formatDate(new Date(), 'MMM DD, YYYY') // "Oct 27, 2025"
 * ```
 */
export function formatDate(date: Date | string | null | undefined, format: string = 'MMM DD, YYYY'): string {
  if (!date) return '';
  return dayjs(date).format(format);
}

/**
 * formatDateTime - Format date and time
 * 
 * @example
 * ```tsx
 * formatDateTime(new Date()) // "Oct 27, 2025 10:30 AM"
 * ```
 */
export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return '';
  return dayjs(date).format('MMM DD, YYYY h:mm A');
}

/**
 * formatTime - Format time only
 * 
 * @example
 * ```tsx
 * formatTime(new Date()) // "10:30 AM"
 * ```
 */
export function formatTime(date: Date | string | null | undefined): string {
  if (!date) return '';
  return dayjs(date).format('h:mm A');
}

/**
 * formatRelativeTime - Format date as relative time (e.g., "2 hours ago")
 * 
 * @example
 * ```tsx
 * formatRelativeTime(new Date()) // "a few seconds ago"
 * ```
 */
export function formatRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return '';
  return dayjs(date).fromNow();
}

/**
 * isToday - Check if date is today
 * 
 * @example
 * ```tsx
 * isToday(new Date()) // true
 * ```
 */
export function isToday(date: Date | string | null | undefined): boolean {
  if (!date) return false;
  return dayjs(date).isSame(dayjs(), 'day');
}

/**
 * isYesterday - Check if date is yesterday
 */
export function isYesterday(date: Date | string | null | undefined): boolean {
  if (!date) return false;
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
}

/**
 * isSameDay - Check if two dates are the same day
 */
export function isSameDay(
  date1: Date | string | null | undefined,
  date2: Date | string | null | undefined
): boolean {
  if (!date1 || !date2) return false;
  return dayjs(date1).isSame(dayjs(date2), 'day');
}

/**
 * addDays - Add days to a date
 * 
 * @example
 * ```tsx
 * addDays(new Date(), 7) // Date 7 days from now
 * ```
 */
export function addDays(date: Date | string, days: number): Date {
  return dayjs(date).add(days, 'day').toDate();
}

/**
 * subtractDays - Subtract days from a date
 */
export function subtractDays(date: Date | string, days: number): Date {
  return dayjs(date).subtract(days, 'day').toDate();
}

/**
 * getDateRange - Get start and end dates for common ranges
 * 
 * @example
 * ```tsx
 * getDateRange('today') // { start: Date, end: Date }
 * getDateRange('last7days')
 * ```
 */
export function getDateRange(range: 'today' | 'yesterday' | 'last7days' | 'last30days' | 'thisMonth' | 'lastMonth'): {
  start: Date;
  end: Date;
} {
  const now = dayjs();
  
  switch (range) {
    case 'today':
      return {
        start: now.startOf('day').toDate(),
        end: now.endOf('day').toDate(),
      };
    case 'yesterday':
      return {
        start: now.subtract(1, 'day').startOf('day').toDate(),
        end: now.subtract(1, 'day').endOf('day').toDate(),
      };
    case 'last7days':
      return {
        start: now.subtract(6, 'day').startOf('day').toDate(),
        end: now.endOf('day').toDate(),
      };
    case 'last30days':
      return {
        start: now.subtract(29, 'day').startOf('day').toDate(),
        end: now.endOf('day').toDate(),
      };
    case 'thisMonth':
      return {
        start: now.startOf('month').toDate(),
        end: now.endOf('month').toDate(),
      };
    case 'lastMonth':
      return {
        start: now.subtract(1, 'month').startOf('month').toDate(),
        end: now.subtract(1, 'month').endOf('month').toDate(),
      };
    default:
      return {
        start: now.startOf('day').toDate(),
        end: now.endOf('day').toDate(),
      };
  }
}

