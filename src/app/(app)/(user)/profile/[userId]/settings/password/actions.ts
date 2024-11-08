'use server';

import { dbGetUserByEmailAndPassword, dbUpdateUserPassword } from '@/db/functions/user';
import { getUser } from '@/utils/auth';
import { redirect } from 'next/navigation';

type UpdatePasswordProps = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

export async function updatePassword({ email, oldPassword, newPassword }: UpdatePasswordProps) {
  const user = await getUser();

  if (email !== user.email) {
    throw new Error('Unauthorized');
  }

  if (!user.emailVerified) {
    redirect('/verify-email');
  }

  await dbGetUserByEmailAndPassword(email, oldPassword);

  const updatedUser = await dbUpdateUserPassword({ email, password: newPassword });

  if (updatedUser === undefined) {
    throw new Error('Failed to update password');
  }

  return updatedUser;
}
