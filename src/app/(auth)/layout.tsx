import { getMaybeUserSession } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getMaybeUserSession();

  if (session !== null) redirect('/');

  return <div className="bg-slate-900 dark:bg-gray-800">{children}</div>;
}
