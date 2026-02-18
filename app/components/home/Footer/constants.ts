/**
 * Constants for Footer component
 * Following Single Responsibility Principle - only contains constant values
 */

export const FOOTER_CONTENT = {
  title: 'صوت الحياة',
  description:
    'مبادرة تهدف لتعزيز روح الترابط الاجتماعي في أحيائنا عبر المنافسة الإيجابية في احتفالية الحوامة التقليدية.',
  copyright: 'جميع الحقوق محفوظة © 2026 - صوت الحياة',
} as const;

export const SUCCESS_PARTNERS = [
  {
    name: 'محمد الحبيب',
    url: 'https://www.alhabibinv.com/',
  },
  {
    name: 'موقع سكني',
    url: 'https://sakani.sa/',
  },
  {
    name: 'تطبيق سكني (iOS)',
    url: 'https://apps.apple.com/sa/app/sakani/id1439423333',
  },
  {
    name: 'تطبيق سكني (Android)',
    url: 'https://play.google.com/store/apps/details?id=sa.housing.sakani&hl=ar',
  },
] as const;
