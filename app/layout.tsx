/**
 * التخطيط الجذري (Root Layout) - App Router
 *
 * هذا الملف يغلف جميع الصفحات في مجلد app/ ويُستخدم لـ:
 * - تحميل خط Cairo من public/fonts/Cairo-Regular.ttf
 * - تطبيق اتجاه RTL للعربية
 * - استيراد التنسيقات العامة والـ Providers
 */

import '@/styles/globals.css';
import { QueryClientProvider } from '@/providers';
import { ThemeProvider } from '@/providers';
import { VisitorTracker } from '@/app/components/shared/VisitorTracker';
import { ViewportHeightFix } from '@/app/components/shared/ViewportHeightFix';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'صوت الحياة',
  description: 'مبادرة تجمع أحياءك عبر التصويت الإيجابي — صوتك يحدد الفائز باحتفالية الحوامة في رمضان.',
};

/**
 * التخطيط الجذري: يغلف كل الصفحات تحت app/
 * - dir="rtl" لتوجيه الصفحة من اليمين لليسار (مناسب للعربية)
 * - الخط: Cairo من public/fonts/Cairo-Regular.ttf (معرّف في globals.css)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen"
        suppressHydrationWarning
      >
        <VisitorTracker />
        <ViewportHeightFix />
        <ThemeProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
