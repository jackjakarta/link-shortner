'use server';

import { dbDeleteLink } from '@/db/functions/link';
import { env } from '@/env';
import { getUser } from '@/utils/auth';

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

export async function deleteLink({ linkId }: { linkId: string }) {
  const user = await getUser();

  await dbDeleteLink({ linkId, userId: user.id });
}
