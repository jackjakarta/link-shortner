import Navbar from '@/components/navbar';

import ShortenUrlForm from './url-form';

export default function ShortenPage() {
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center bg-slate-900 dark:bg-gray-800">
        <ShortenUrlForm />
      </main>
    </>
  );
}
