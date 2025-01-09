'use server';

import { dbCreateApiKey, dbSetApiKeyStatus } from '@/db/functions/api-key';
import { type ApiKeyStatus } from '@/db/schema';
import { getUser } from '@/utils/auth';

export async function createApiKey({ apiKeyName }: { apiKeyName: string }) {
  const user = await getUser();
  const apiKey = await dbCreateApiKey({ apiKeyName, userId: user.id });

  return apiKey;
}

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
