import { dbDeleteActionToken, dbValidateToken } from '@/db/functions/token';
import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import EmailVerifySuccess from './email-verify-success';
import TokenVerifyFail from './token-verify-fail';

export const metadata: Metadata = {
  title: 'LnkTo - Email Verification',
  description: 'Verifizieren Sie Ihre E-Mail-Adresse',
};

export default async function UserActionPage({
  searchParams,
}: {
  searchParams?: {
    token?: string;
  };
}) {
  const token = searchParams?.token;

  if (token === undefined) {
    return notFound();
  }

  const userActionToken = await dbValidateToken(token);

  if (userActionToken === undefined) {
    return <TokenVerifyFail />;
  }

  if (userActionToken.action === 'reset-password') {
    redirect(`/reset-password?token=${userActionToken.token}`);
  }

  if (userActionToken.action === 'verify-email') {
    await dbDeleteActionToken({ token });

    return <EmailVerifySuccess />;
  }

  return notFound();
}
