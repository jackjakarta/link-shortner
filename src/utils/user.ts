import crypto from 'crypto';

import { type UserRow } from '@/db/schema';

export type ObscuredUser = Omit<UserRow, 'passwordHash' | 'passwordSalt'>;

export async function obscureUser({ user }: { user: UserRow }): Promise<ObscuredUser> {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    authProvider: user.authProvider,
    createdAt: user.createdAt,
    isSuperAdmin: user.isSuperAdmin,
    isNewsletterSub: user.isNewsletterSub,
  };
}

export async function getUserAvatarUrl({ email, size }: { email: string; size?: number }) {
  const trimmedEmail = email.trim().toLowerCase();
  const imageSize = size ?? 200;

  const hash = crypto.createHash('sha256').update(trimmedEmail).digest('hex');
  const avatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${imageSize}&d=identicon`;

  return avatarUrl;
}
