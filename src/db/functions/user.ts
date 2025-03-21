import { eq } from 'drizzle-orm';

import { db } from '..';
import { createPasswordHash, generateSalt, makeHash } from '../crypto';
import {
  apiKeyTable,
  apiKeyUsageTable,
  shortLinkTable,
  tokenTable,
  userProfileTable,
  userTable,
  type UserInsertRow,
  type UserRow,
} from '../schema';

export async function dbGetUserById(userId: string): Promise<UserRow | undefined> {
  const user = (await db.select().from(userTable).where(eq(userTable.id, userId)))[0];

  return user;
}

export async function dbGetUserByEmailAndPassword(
  email: string,
  plainPassword: string,
): Promise<UserRow> {
  const maybeUser = (await db.select().from(userTable).where(eq(userTable.email, email)))[0];

  if (maybeUser === undefined) {
    throw Error(`No user with email '${email}' found`);
  }

  const passwordHash = createPasswordHash(plainPassword, maybeUser.passwordSalt);

  if (maybeUser.passwordHash !== passwordHash) {
    throw Error(`Wrong password`);
  }
  return maybeUser;
}

export async function dbRegisterNewUser({
  id,
  email,
  name,
  plainPassword,
  isNewsletterSub,
}: {
  id: string;
  email: string;
  name: string;
  plainPassword: string;
  isNewsletterSub: boolean;
}) {
  const emailRows = await db.select().from(userTable).where(eq(userTable.email, email));
  if (emailRows.length > 0) throw new Error('Email already exists.');

  const nameRows = await db.select().from(userTable).where(eq(userTable.name, name));
  if (nameRows.length > 0) throw new Error('Username already exists.');

  const passwordSalt = makeHash(generateSalt());
  const passwordHash = createPasswordHash(plainPassword, passwordSalt);

  await db.transaction(async (tx) => {
    await tx.insert(userTable).values({
      id,
      email,
      name,
      passwordHash,
      passwordSalt,
      isNewsletterSub,
    });

    await tx.insert(userProfileTable).values({
      userId: id,
    });
  });

  return { id, plainPassword, email };
}

export async function dbGetUserByEmail({ email }: { email: string }): Promise<UserRow | undefined> {
  const maybeUser = (await db.select().from(userTable).where(eq(userTable.email, email)))[0];

  return maybeUser;
}

export async function dbUpdateUserPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserRow | undefined> {
  const passwordSalt = makeHash(generateSalt());
  const passwordHash = createPasswordHash(password, passwordSalt);

  const user = (
    await db
      .update(userTable)
      .set({ passwordHash, passwordSalt })
      .where(eq(userTable.email, email))
      .returning()
  )[0];

  return user;
}

export async function dbCreateUser(user: UserInsertRow) {
  const newUser = await db.transaction(async (tx) => {
    const maybeUser = (await tx.insert(userTable).values(user).returning())[0];

    if (maybeUser === undefined) {
      throw new Error('Failed to create user');
    }

    await tx.insert(userProfileTable).values({
      userId: maybeUser.id,
    });

    return maybeUser;
  });

  return newUser;
}

export async function dbSetUserEmailVerified({
  userId,
  status,
}: {
  userId: string;
  status: boolean;
}) {
  await db.update(userTable).set({ emailVerified: status }).where(eq(userTable.id, userId));
}

export async function dbSetNewsletterSubscription({
  userId,
  status,
}: {
  userId: string;
  status: boolean;
}) {
  await db.update(userTable).set({ isNewsletterSub: status }).where(eq(userTable.id, userId));
}

export async function dbGetNewsletterSubs() {
  const users = await db
    .select({ email: userTable.email, name: userTable.name })
    .from(userTable)
    .where(eq(userTable.isNewsletterSub, true));

  return users;
}

export async function dbDeleteUser({ userId, userEmail }: { userId: string; userEmail: string }) {
  await db.transaction(async (tx) => {
    const userApiKeys = await tx.select().from(apiKeyTable).where(eq(apiKeyTable.userId, userId));

    if (userApiKeys.length > 0) {
      await Promise.all(
        userApiKeys.map((apiKey) =>
          tx.delete(apiKeyUsageTable).where(eq(apiKeyUsageTable.apiKeyId, apiKey.id)),
        ),
      );
    }

    await tx.delete(tokenTable).where(eq(tokenTable.email, userEmail));
    await tx.delete(apiKeyTable).where(eq(apiKeyTable.userId, userId));
    await tx.delete(shortLinkTable).where(eq(shortLinkTable.userId, userId));
    await tx.delete(userProfileTable).where(eq(userProfileTable.userId, userId));
    await tx.delete(userTable).where(eq(userTable.id, userId));
  });
}
