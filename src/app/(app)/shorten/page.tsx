import Navbar from '@/components/navbar';
import { getMaybeUserSession } from '@/utils/auth';

import ShortenUrlForm from './url-form';

export default async function ShortenPage() {
  const session = await getMaybeUserSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main className="flex items-center justify-center bg-slate-900 dark:bg-gray-800">
        <ShortenUrlForm />
      </main>
    </>
  );
}
