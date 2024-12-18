'use server';

import { dbGetLinksByUserId } from '@/db/functions/link';
import { getUser } from '@/utils/auth';

export async function getLinksByUserId() {
  const user = await getUser();
  const userLinks = await dbGetLinksByUserId({ userId: user.id });

  return userLinks;
}
