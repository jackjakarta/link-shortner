import InfoPageCard from '@/components/info-page-card';
import { getUser } from '@/utils/auth';

export default async function Page() {
  const user = await getUser();

  if (!user.emailVerified) {
    return (
      <InfoPageCard title="Verify your email" message="Please verify your email to continue" />
    );
  }

  return <InfoPageCard title="Account active" message="Your email has already been verified" />;
}
