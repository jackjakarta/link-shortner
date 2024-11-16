'use server';

import { dbSetApiKEyStatus } from '@/db/functions/api-key';
import { type ApiKeyStatus } from '@/db/schema';
import { getUser } from '@/utils/auth';

export async function setApiKEyStatus({
  apiKeyId,
  status,
}: {
  apiKeyId: string;
  status: ApiKeyStatus;
}) {
  const user = await getUser();

  await dbSetApiKEyStatus({ apiKeyId, status, userId: user.id });
}
