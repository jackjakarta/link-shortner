'use server';

import { dbUpdateUserProfile } from '@/db/functions/profile';
import { type UserProfileRow } from '@/db/schema';
import { getUser } from '@/utils/auth';
import { redirect } from 'next/navigation';

type UpdateProfileProps = {
  userId: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
};

export async function updateProfile({
  userId,
  bio,
  avatarUrl,
  location,
  website,
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
    avatarUrl,
    location,
    website,
  });

  if (userProfile === undefined) {
    throw new Error('Failed to update profile');
  }

  return userProfile;
}
