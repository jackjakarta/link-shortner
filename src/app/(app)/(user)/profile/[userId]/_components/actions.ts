'use server';

import { dbDeleteLink } from '@/db/functions/link';
import { getUser } from '@/utils/auth';

export async function deleteLink({ linkId }: { linkId: string }) {
  const user = await getUser();

  await dbDeleteLink({ linkId, userId: user.id });
}
