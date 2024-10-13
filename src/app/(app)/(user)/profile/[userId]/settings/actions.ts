'use server';

import { dbUpdateUserProfile } from '@/db/functions/profile';
import { type UserProfileInsertRow, type UserProfileRow } from '@/db/schema';
import { getUser } from '@/utils/auth';
import { redirect } from 'next/navigation';

export async function updateProfile({
  userId,
  bio,
  location,
  website,
}: UserProfileInsertRow): Promise<UserProfileRow> {
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

  if (userProfile === undefined) {
    throw new Error('Failed to update profile');
  }

  return userProfile;
}
