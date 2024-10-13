'use server';

import { dbUpdateUserPassword } from '@/db/functions/user';
import { getUser } from '@/utils/auth';
import { redirect } from 'next/navigation';

type UpdatePasswordProps = {
  email: string;
  password: string;
};

export async function updatePassword({ email, password }: UpdatePasswordProps) {
  const user = await getUser();

  if (email !== user.email) {
    throw new Error('Unauthorized');
  }

  if (!user.emailVerified) {
    redirect('/verify-email');
  }

  const updatedUser = await dbUpdateUserPassword({ email, password });

  if (updatedUser === undefined) {
    throw new Error('Failed to update password');
  }

  return updatedUser;
}
