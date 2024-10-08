'use server';

import { eq } from 'drizzle-orm';

import { db } from '..';
import { userProfileTable, type UserProfileInsertRow, type UserProfileRow } from '../schema';

export async function dbGetUserProfileByUserId({
  userId,
}: {
  userId: string;
}): Promise<UserProfileRow | undefined> {
  const userProfile = (
    await db.select().from(userProfileTable).where(eq(userProfileTable.userId, userId))
  )[0];

  return userProfile;
}

export async function dbUpdateUserProfile({
  userId,
  bio,
  avatarUrl,
  location,
  website,
}: UserProfileInsertRow) {
  const userProfile = (
    await db
      .update(userProfileTable)
      .set({
        bio,
        avatarUrl,
        location,
        website,
      })
      .where(eq(userProfileTable.userId, userId))
      .returning()
  )[0];

  return userProfile;
}
