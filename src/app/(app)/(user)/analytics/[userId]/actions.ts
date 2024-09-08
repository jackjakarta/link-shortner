'use server';

import { dbGetTotalClickCount, dbGetTotalClicksPerDay } from '@/db/functions/link';
import { getUser } from '@/utils/auth';

export async function getLinkStats(userId: string) {
  const user = await getUser();

  if (user.id !== userId) {
    throw new Error('Unauthorized');
  }

  const [clicksByDay, clicksTotal] = await Promise.all([
    await dbGetTotalClicksPerDay({ userId }),
    await dbGetTotalClickCount({ userId }),
  ]);

  return { clicksByDay, clicksTotal };
}
