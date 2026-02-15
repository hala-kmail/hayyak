/** Format number with locale (e.g. Arabic numerals). */
export function formatNumber(value: number, locale = 'ar-SA'): string {
  return new Intl.NumberFormat(locale).format(value);
}
