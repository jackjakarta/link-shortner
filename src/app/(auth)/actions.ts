'use server';

import { dbGetUserByEmail } from '@/db/functions/user';
import { sendUserActionEmail } from '@/email/send';

export async function sendVerifyEmail({ email }: { email: string }) {
  const maybeUser = await dbGetUserByEmail({ email });

  if (maybeUser === undefined) {
    return;
  }

  await sendUserActionEmail({ to: email, action: 'verify-email' });
}
