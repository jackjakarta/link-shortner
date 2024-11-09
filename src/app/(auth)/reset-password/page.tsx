import { dbValidateToken } from '@/db/functions/token';

import InitiatePasswordResetForm from './initiate-password-reset';
import ResetPasswordForm from './reset-password-form';

export default async function Page({ searchParams }: { searchParams?: { token?: string } }) {
  const maybeToken = searchParams?.token;
  const userActionRow = maybeToken !== undefined ? await dbValidateToken(maybeToken) : undefined;

  return (
    <>
      {userActionRow !== undefined ? (
        <ResetPasswordForm {...userActionRow} />
      ) : (
        <InitiatePasswordResetForm />
      )}
    </>
  );
}
