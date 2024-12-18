import { getUser } from '@/utils/auth';

import SettingsNavbar from '../settings-navbar';
import ApiNavbar from './api-navbar';
import CreateApiKeyButton from './create-api-key-button';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <main className="px-8 py-1 mt-4">
      <SettingsNavbar />
      <div className="flex flex-col w-full mt-4">
        <CreateApiKeyButton user={user} />
        <ApiNavbar />
        {children}
      </div>
    </main>
  );
}
