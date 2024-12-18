import { cw } from '@/utils/tailwind';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

import { aeonik } from './fonts/aeonik';

import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Klikr - URL Shortener',
    description: 'Shorten your URLs with Klikr',
    icons: { icon: '/favicon.png' },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cw(aeonik.className, 'bg-slate-900 dark:bg-gray-800')}>
        <Toaster
          toastOptions={{
            className: 'border border-[1px] rounded-none border-main-900',
            style: {
              borderRadius: 0,
            },
          }}
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
