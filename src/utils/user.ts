import crypto from 'crypto';

import { type UserRow } from '@/db/schema';

export type ObscuredUser = Omit<UserRow, 'passwordHash' | 'passwordSalt'>;

export function obscureUser(user: UserRow): ObscuredUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    provider: user.provider,
    createdAt: user.createdAt,
  };
}

export async function getUserAvatarUrl(email: string, size = 80) {
  const trimmedEmail = email.trim().toLowerCase();
  const hash = crypto.createHash('sha256').update(trimmedEmail).digest('hex');

  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}
