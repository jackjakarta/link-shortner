'use server';

import { dbGetTotalClickCount, dbGetTotalClicksPerDay } from '@/db/functions/link';
import { getUser } from '@/utils/auth';

export async function getLinkStats() {
  const user = await getUser();

  const [clicksByDay, clicksTotal] = await Promise.all([
    await dbGetTotalClicksPerDay({ userId: user.id }),
    await dbGetTotalClickCount({ userId: user.id }),
  ]);

  return { clicksByDay, clicksTotal };
}
