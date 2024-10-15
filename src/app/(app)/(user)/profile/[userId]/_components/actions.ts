'use server';

import { env } from '@/env';

export async function generateQrCode({ linkId, url }: { linkId: string; url: string }) {
  const baseUrl = env.NEXT_PUBLIC_baseUrl;

  const response = await fetch(`${baseUrl}/api/qr-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ linkId, url }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }
}
