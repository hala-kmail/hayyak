/**
 * التخطيط الجذري (Root Layout) - App Router
 *
 * هذا الملف يغلف جميع الصفحات في مجلد app/ ويُستخدم لـ:
 * - تحميل خط Cairo وتعيينه كخط أساسي
 * - تطبيق اتجاه RTL للعربية
 * - استيراد التنسيقات العامة والـ Providers
 */

import '@/styles/globals.css';
import { Cairo } from 'next/font/google';
import { QueryClientProvider } from '@/providers';
import { ThemeProvider } from '@/providers';
import type { Metadata } from 'next';

/* ─────────────────────────────────────────────────────────────────────────────
 * 1) تحميل خط Cairo عبر next/font/google
 * ─────────────────────────────────────────────────────────────────────────────
 * - subsets: ['latin', 'arabic'] لتحميل أحرف اللاتينية والعربية فقط (تقليل الحجم)
 * - variable: '--font-cairo' لإنشاء متغير CSS يمكن استخدامه في التنسيقات
 * - display: 'swap' لعدم إخفاء النص حتى اكتمال تحميل الخط (تحسين التجربة)
 * - next/font يحمّل الخط في وقت البناء ويخدمه محلياً (أداء أفضل)
 */
const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'سكني سابع جار',
  description: 'صوت لحيك خله يفوز بحوامة رمضان',
};

/**
 * التخطيط الجذري: يغلف كل الصفحات تحت app/
 * - dir="rtl" لتوجيه الصفحة من اليمين لليسار (مناسب للعربية)
 * - className: نربط كلاس الخط (المتغير + الخط الفعلي) ليكون الخط أساسياً
 * - يمكنك استخدام var(--font-cairo) في أي ملف CSS أو Tailwind
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${cairo.className} antialiased min-h-screen`}
      >
        <ThemeProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
