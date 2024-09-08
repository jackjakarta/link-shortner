import { getUser } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUser();

  redirect(`/analytics/${user.id}`);
}
