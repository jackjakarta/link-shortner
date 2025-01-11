'use server';

import { dbGetUserByEmail } from '@/db/functions/user';

export async function checkEmailExists({ email }: { email: string }) {
  const user = await dbGetUserByEmail({ email });
  const emailExists = user !== undefined;

  return emailExists;
}
