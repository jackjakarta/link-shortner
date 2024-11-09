'use server';

import { dbGetLinksByUserId } from '@/db/functions/link';
import { getUser } from '@/utils/auth';
import { revalidateTag } from 'next/cache';

export async function getLinksByUserId({ userId }: { userId: string }) {
  const user = await getUser();

  if (userId !== user.id) {
    throw new Error('Unauthorized');
  }

  const userLinks = await dbGetLinksByUserId({ userId });
  revalidateTag('user-links');

  return userLinks;
}
