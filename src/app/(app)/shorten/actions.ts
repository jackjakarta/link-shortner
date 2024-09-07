'use server';

import { generateRandomUrlSafeString } from '@/db/crypto';
import { dbCreateLink } from '@/db/functions/link';
import { getUser } from '@/utils/auth';
import { redirect } from 'next/navigation';

export async function shortenUrl(url: string) {
  const user = await getUser();

  if (!user.emailVerified) {
    redirect('/verify-email');
  }

  const shortPath = generateRandomUrlSafeString(4);

  const shortenedLink = await dbCreateLink({
    shortPath: shortPath,
    longUrl: url,
    userId: user.id,
  });

  if (shortenedLink === undefined) {
    throw new Error('Failed to shorten url');
  }

  return shortenedLink;
}
