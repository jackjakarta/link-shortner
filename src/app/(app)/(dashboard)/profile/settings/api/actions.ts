'use server';

import { dbSetApiKeyStatus } from '@/db/functions/api-key';
import { type ApiKeyStatus } from '@/db/schema';
import { getUser } from '@/utils/auth';

export async function setApiKeyStatus({
  apiKeyId,
  status,
}: {
  apiKeyId: string;
  status: ApiKeyStatus;
}) {
  const user = await getUser();

  await dbSetApiKeyStatus({ apiKeyId, status, userId: user.id });
}
