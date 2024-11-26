import Navbar from '@/components/navbar';
import { getMaybeUserSession } from '@/utils/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getMaybeUserSession();

  return (
    <>
      <Navbar user={session?.user} />
      {children}
    </>
  );
}
