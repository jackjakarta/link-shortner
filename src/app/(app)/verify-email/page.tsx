import { getUser } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUser();

  if (user.emailVerified) {
    redirect(`/profile/${user.id}`);
  }

  return <h1>You need to verify your email.</h1>;
}
