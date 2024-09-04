'use server';

import { dbGetLinksByUserId } from '@/db/functions/link';
import { getUser } from '@/utils/auth';
import { redirect } from 'next/navigation';

export async function getLinksByUserId(userId: string) {
  const user = await getUser();

  if (user.id !== userId) {
    redirect('/');
  }

  const userLinks = await dbGetLinksByUserId(userId);

  return userLinks;
}
