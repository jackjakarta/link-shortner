'use server';

import { dbUpdateUserProfile } from '@/db/functions/profile';
import { dbSetNewsletterSubscription } from '@/db/functions/user';
import { type UserProfileInsertRow, type UserProfileRow } from '@/db/schema';
import { getUser } from '@/utils/auth';
import { redirect } from 'next/navigation';

type UpdateProfileProps = Omit<UserProfileInsertRow, 'userId'> & { isNewsletterSub: boolean };

export async function updateProfile({
  bio,
  location,
  website,
  isNewsletterSub,
}: UpdateProfileProps): Promise<UserProfileRow> {
  const user = await getUser();

  if (!user.emailVerified) {
    redirect('/verify-email');
  }

  const userProfile = await dbUpdateUserProfile({
    userId: user.id,
    bio,
    location,
    website,
  });

  await dbSetNewsletterSubscription({ userId: user.id, status: isNewsletterSub });

  if (userProfile === undefined) {
    throw new Error('Failed to update profile');
  }

  return userProfile;
}
