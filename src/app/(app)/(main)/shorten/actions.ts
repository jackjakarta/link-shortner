'use server';

import { dbCreateLink } from '@/db/functions/link';
import { getUser } from '@/utils/auth';
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';

export async function shortenUrl({ url }: { url: string }) {
  const user = await getUser();

  if (!user.emailVerified) {
    redirect('/verify-email');
  }

  const shortPath = nanoid(4);

  const shortenedLink = await dbCreateLink({
    shortPath,
    longUrl: url,
    userId: user.id,
  });

  if (shortenedLink === undefined) {
    throw new Error('Failed to shorten url');
  }

  return shortenedLink;
}
