/**
 * Format utilities for common data transformations
 */

/**
 * formatCurrency - Format a number as currency
 * 
 * @example
 * ```tsx
 * formatCurrency(1234.56, 'USD') // "$1,234.56"
 * formatCurrency(1234.56) // "1,234.56"
 * ```
 */
export function formatCurrency(
  amount: number | string | undefined | null,
  currency?: string,
): string {
  const parsed = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (typeof parsed !== 'number' || isNaN(parsed)) {
    return 'N/A';
  }

  return currency
    ? parsed.toLocaleString('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : parsed.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
}

/**
 * formatNumber - Format a number with thousands separator
 * 
 * @example
 * ```tsx
 * formatNumber(1234567) // "1,234,567"
 * formatNumber(1234.5678, 2) // "1,234.57"
 * ```
 */
export function formatNumber(
  value: number | string | undefined | null,
  decimals?: number,
): string {
  const parsed = typeof value === 'string' ? parseFloat(value) : value;

  if (typeof parsed !== 'number' || isNaN(parsed)) {
    return 'N/A';
  }

  return parsed.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * formatPercentage - Format a number as percentage
 * 
 * @example
 * ```tsx
 * formatPercentage(0.1567) // "15.67%"
 * formatPercentage(0.5, 0) // "50%"
 * ```
 */
export function formatPercentage(
  value: number | undefined | null,
  decimals: number = 2,
): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'N/A';
  }

  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * formatFileSize - Format bytes as human-readable file size
 * 
 * @example
 * ```tsx
 * formatFileSize(1024) // "1.00 KB"
 * formatFileSize(1048576) // "1.00 MB"
 * ```
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

