'use server';

import { dbUpdateUserProfile } from '@/db/functions/profile';
import { dbUpdateUserPassword } from '@/db/functions/user';
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

type UpdatePasswordProps = {
  email: string;
  password: string;
};

export async function updatePassword({ email, password }: UpdatePasswordProps) {
  const user = await getUser();

  if (email !== user.email) {
    throw new Error('Unauthorized');
  }

  if (!user.emailVerified) {
    redirect('/verify-email');
  }

  const updatedUser = await dbUpdateUserPassword({ email, password });

  if (updatedUser === undefined) {
    throw new Error('Failed to update password');
  }

  return updatedUser;
}
