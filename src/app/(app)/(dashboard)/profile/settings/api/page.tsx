import { dbGetApiKeysByUserId } from '@/db/functions/api-key';
import { getUser } from '@/utils/auth';

import ApiKeysTable from './api-keys-table';

export default async function Page() {
  const user = await getUser();
  const apiKeys = await dbGetApiKeysByUserId({ userId: user.id });

  return <ApiKeysTable apiKeys={apiKeys} />;
}
