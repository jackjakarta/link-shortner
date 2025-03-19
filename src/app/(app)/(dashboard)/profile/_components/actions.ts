'use server';

import { dbDeleteLink, dbGetLinkById } from '@/db/functions/link';
import { dbDeleteUser } from '@/db/functions/user';
import { sendUserActionInformationEmail } from '@/email/send';
import { deleteFileFromS3, getSignedUrlFromS3Get } from '@/s3';
import { getUser } from '@/utils/auth';
import { devMode } from '@/utils/constants';

export async function deleteLink({ linkId }: { linkId: string }) {
  const user = await getUser();
  const link = await dbGetLinkById({ linkId, userId: user.id });

  if (link === undefined) {
    throw new Error('Link not found');
  }

  await Promise.all([
    deleteFileFromS3({ key: link.qrCodeS3Key ?? '' }),
    dbDeleteLink({ linkId: link.id, userId: user.id }),
  ]);
}

export async function deleteAccount() {
  const user = await getUser();

  if (!devMode) {
    await sendUserActionInformationEmail(user.email, { type: 'account-delete-success' });
  }

  await dbDeleteUser({ userId: user.id, userEmail: user.email });
}

export async function getS3SignedUrlAction({ key }: { key: string }) {
  const signedUrl = await getSignedUrlFromS3Get({ key });

  return signedUrl;
}
