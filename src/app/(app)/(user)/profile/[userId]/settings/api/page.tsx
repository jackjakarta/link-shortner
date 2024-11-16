import { dbGetApiKeysByUserId } from '@/db/functions/api-key';
import { getUser } from '@/utils/auth';

import SettingsNavbar from '../settings-navbar';
import ApiKeysTable from './api-keys-table';
import CreateApiKeyButton from './create-api-key-button';

export default async function Page() {
  const user = await getUser();
  const apiKeys = await dbGetApiKeysByUserId({ userId: user.id });

  return (
    <main className="px-8 py-1 mt-4">
      <SettingsNavbar userId={user.id} />
      <div className="flex flex-col w-full gap-4 mt-4">
        <CreateApiKeyButton user={user} />
      </div>
      <div className="flex">
        <ApiKeysTable apiKeys={apiKeys} />
      </div>
    </main>
  );
}
