import '@/styles/globals.css';
import { Cairo } from 'next/font/google';
import { QueryClientProvider } from '@/providers';
import { ThemeProvider } from '@/providers';
import type { AppProps } from 'next/app';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${cairo.variable} ${cairo.className}`} dir="rtl">
      <ThemeProvider>
        <QueryClientProvider>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}
