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
