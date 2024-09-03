'use server';

import { dbGetLinksByUserId } from '@/db/functions/link';
import { getUser } from '@/utils/auth';

export async function getLinksByUserId(userId: string) {
  const user = await getUser();

  if (user.id !== userId) {
    throw new Error('Unauthorized');
  }

  const userLinks = await dbGetLinksByUserId(userId);

  return userLinks;
}
