'use server';

import { dbGetUserByEmail, dbUpdateUserPassword } from '@/db/functions/user';

export async function getUserByEmail({ email }: { email: string }) {
  const user = await dbGetUserByEmail({ email });

  return user;
}

export async function updateUserPassword({ email, password }: { email: string; password: string }) {
  await dbUpdateUserPassword({ email, password });
}
