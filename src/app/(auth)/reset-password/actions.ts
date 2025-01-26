'use server';

import { dbGetUserByEmail, dbUpdateUserPassword } from '@/db/functions/user';
import { sendUserActionEmail, sendUserActionInformationEmail } from '@/email/send';

export async function getUserByEmail({ email }: { email: string }) {
  const user = await dbGetUserByEmail({ email });

  return user;
}

export async function updateUserPassword({ email, password }: { email: string; password: string }) {
  const user = await dbGetUserByEmail({ email });

  if (user === undefined) {
    return;
  }

  await dbUpdateUserPassword({ email, password });
}

export async function sendPasswordResetEmail({ email }: { email: string }) {
  const user = await dbGetUserByEmail({ email });

  if (user === undefined) {
    return;
  }

  const emailResult = await sendUserActionEmail({ to: email, action: 'reset-password' });

  return emailResult;
}

export async function sendPasswordResetInformationEmail({ email }: { email: string }) {
  const user = await dbGetUserByEmail({ email });

  if (user === undefined) {
    return;
  }

  const emailResult = await sendUserActionInformationEmail(email, {
    type: 'reset-password-success',
  });

  return emailResult;
}
