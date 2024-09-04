import { type Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

import { aeonik } from './fonts/utils';

import './globals.css';

export const metadata: Metadata = {
  title: 'Lnkto - URL Shortener',
  description: 'Shorten your URLs with Lnkto',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={aeonik.className}>
        <Toaster
          toastOptions={{
            className: 'border border-[1px] rounded-none border-main-900',
            style: {
              borderRadius: 0,
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
