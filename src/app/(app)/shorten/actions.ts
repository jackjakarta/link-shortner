'use server';

import { generateRandomUrlSafeString } from '@/db/crypto';
import { dbCreateLink } from '@/db/functions/link';
import { getUser } from '@/utils/auth';

export async function shortenUrl(url: string) {
  const user = await getUser();
  const shortPath = generateRandomUrlSafeString(5);

  const shortenedLink = await dbCreateLink({
    shortPath: shortPath,
    longUrl: url,
    userId: user.id,
  });

  return shortenedLink[0];
}
