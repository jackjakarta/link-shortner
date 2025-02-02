import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type Metadata } from 'next';

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
      <body className={aeonik.className}>
        {children}
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
