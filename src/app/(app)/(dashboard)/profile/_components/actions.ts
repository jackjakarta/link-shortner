'use server';

import { dbDeleteLink, dbGetLinkById } from '@/db/functions/link';
import { dbDeleteUser } from '@/db/functions/user';
import { sendUserActionInformationEmail } from '@/email/send';
import { deleteFileFromS3 } from '@/s3';
import { getUser } from '@/utils/auth';
import { devMode } from '@/utils/constants';
import { extractFileNameFromUrl } from '@/utils/url';

export async function deleteLink({ linkId }: { linkId: string }) {
  const user = await getUser();
  const link = await dbGetLinkById({ linkId });

  if (link === undefined) {
    throw new Error('Link not found');
  }

  const fileName = extractFileNameFromUrl(link.qrCodeUrl);

  if (fileName !== null) {
    await deleteFileFromS3({ key: `qr-codes/${fileName}` });
  }

  await dbDeleteLink({ linkId: link.id, userId: user.id });
}

export async function deleteAccount() {
  const user = await getUser();

  if (!devMode) {
    await sendUserActionInformationEmail(user.email, { type: 'account-delete-success' });
  }

  await dbDeleteUser({ userId: user.id, userEmail: user.email });
}
