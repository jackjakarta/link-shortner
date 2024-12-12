'use server';

import { dbDeleteLink, dbGetLinkById } from '@/db/functions/link';
import { deleteFileFromS3 } from '@/s3';
import { getUser } from '@/utils/auth';
import { extractFileName } from '@/utils/url';

export async function deleteLink({ linkId }: { linkId: string }) {
  const user = await getUser();
  const link = await dbGetLinkById({ linkId });

  if (link === undefined) {
    throw new Error('Link not found');
  }

  const fileName = extractFileName(link.qrCodeUrl);

  if (fileName !== null) {
    await deleteFileFromS3({ key: `qr-codes/${fileName}` });
  }

  await dbDeleteLink({ linkId: link.id, userId: user.id });
}
