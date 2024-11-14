'use server';

import { dbUpdateUserProfile } from '@/db/functions/profile';
import { dbSetNewsletterSubscription } from '@/db/functions/user';
import { type UserProfileInsertRow, type UserProfileRow } from '@/db/schema';
import { getUser } from '@/utils/auth';
import { redirect } from 'next/navigation';

type UpdateProfileProps = UserProfileInsertRow & { isNewsletterSub: boolean };

export async function updateProfile({
  userId,
  bio,
  location,
  website,
  isNewsletterSub,
}: UpdateProfileProps): Promise<UserProfileRow> {
  const user = await getUser();

  if (userId !== user.id) {
    throw new Error('Unauthorized');
  }

  if (!user.emailVerified) {
    redirect('/verify-email');
  }

  const userProfile = await dbUpdateUserProfile({
    userId,
    bio,
    location,
    website,
  });

  await dbSetNewsletterSubscription({ userId, status: isNewsletterSub });

  if (userProfile === undefined) {
    throw new Error('Failed to update profile');
  }

  return userProfile;
}
