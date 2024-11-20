import { dbGetApiKeysUsageByUserId } from '@/db/functions/api-key';
import { getUser } from '@/utils/auth';

import ApiKeyUsageChart from './api-usage-chart';

export default async function Page() {
  const user = await getUser();
  const apiKeysUsage = await dbGetApiKeysUsageByUserId({ userId: user.id });

  return (
    <div className="mt-4">
      <ApiKeyUsageChart usageData={apiKeysUsage} />
    </div>
  );
}
