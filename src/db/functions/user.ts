'use server';

import { eq } from 'drizzle-orm';

import { db } from '..';
import { createPasswordHash, generateSalt, makeHash } from '../crypto';
import { userProfileTable, userTable, type UserInsertRow, type UserRow } from '../schema';

export async function dbGetUserById(userId: string): Promise<UserRow> {
  const user = (await db.select().from(userTable).where(eq(userTable.id, userId)))[0];

  if (user === undefined) {
    throw Error(`No user with id ${userId} found`);
  }

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
    throw Error(`Passwords for user with email ${email} do not match.`);
  }
  return maybeUser;
}

export async function dbRegisterNewUser(
  id: string,
  email: string,
  name: string,
  plainPassword: string,
) {
  const rows = await db.select().from(userTable).where(eq(userTable.email, email));

  if (rows.length > 0) throw new Error('Email already exists.');

  const passwordSalt = makeHash(generateSalt());

  const passwordHash = createPasswordHash(plainPassword, passwordSalt);

  await db.transaction(async (tx) => {
    await tx.insert(userTable).values({
      id,
      email,
      name,
      passwordHash,
      passwordSalt,
    });

    await tx.insert(userProfileTable).values({
      userId: id,
    });
  });

  return { plainPassword };
}

export async function dbCreateUser(user: UserInsertRow) {
  const newUser = (await db.insert(userTable).values(user).returning())[0];

  return newUser;
}

export async function dbGetUserByEmail({ email }: { email: string }): Promise<UserRow> {
  const maybeUser = (await db.select().from(userTable).where(eq(userTable.email, email)))[0];

  if (maybeUser === undefined) {
    throw Error(`No user with email '${email}' found`);
  }

  return maybeUser;
}

export async function dbUpdateUserPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
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
