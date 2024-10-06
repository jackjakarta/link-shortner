import { authOptions } from '@/app/api/auth/[...nextauth]/utils';
import { dbGetUserById } from '@/db/functions/user';
import { type UserRow } from '@/db/schema';
import { getServerSession, type Session } from 'next-auth';
import { redirect } from 'next/navigation';

export async function getMaybeUserSession(): Promise<Session | null> {
  const session = await getServerSession(authOptions);

  return session;
}

export async function getValidSession(): Promise<Session> {
  const session = await getServerSession(authOptions);

  if (session === null) {
    redirect('/login');
  }

  return session;
}

export async function getUser(): Promise<UserRow> {
  const session = await getValidSession();
  const user = await dbGetUserById(session.user.id);

  if (!user.emailVerified) {
    redirect('/verify-email');
  }

  return user;
}
