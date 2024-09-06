import SignOutButton from '@/components/signout-button';

import ShortenUrlForm from './url-form';

export default function ShortenPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800">
      <ShortenUrlForm />
      <SignOutButton />
    </main>
  );
}
