import { getUser } from '@/utils/auth';

import EmailVerifiedCard from './email-verified';
import VerifyEmailPage from './verify-email-card';

export default async function Page() {
  const user = await getUser();

  if (user.emailVerified) {
    return <EmailVerifiedCard />;
  }

  return <VerifyEmailPage />;
}
