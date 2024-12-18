import crypto from 'crypto';

import { type UserRow } from '@/db/schema';

import { getUserAvatarUrl, obscureUser, type ObscuredUser } from '../user';

const mockUser: UserRow = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'John Doe',
  email: 'john.doe@example.com',
  emailVerified: true,
  authProvider: 'discord',
  passwordHash: 'someHash',
  passwordSalt: 'someSalt',
  createdAt: new Date('2023-01-01T12:00:00Z'),
  isSuperAdmin: false,
  isNewsletterSub: true,
};

describe('obscureUser', () => {
  test('should return an obscured user without passwordHash and passwordSalt', async () => {
    const result = await obscureUser({ user: mockUser });

    const expectedResult: ObscuredUser = {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      emailVerified: mockUser.emailVerified,
      authProvider: mockUser.authProvider,
      createdAt: mockUser.createdAt,
      isSuperAdmin: mockUser.isSuperAdmin,
      isNewsletterSub: mockUser.isNewsletterSub,
    };

    expect(result).toEqual(expectedResult);
    expect(result).not.toHaveProperty('passwordHash');
    expect(result).not.toHaveProperty('passwordSalt');
  });
});

describe('getUserAvatarUrl', () => {
  test('should return a valid Gravatar URL with the correct hash and default size', async () => {
    const email = 'john.doe@example.com';
    const trimmedEmail = email.trim().toLowerCase();
    const hash = crypto.createHash('sha256').update(trimmedEmail).digest('hex');

    const result = await getUserAvatarUrl({ email });

    const expectedUrl = `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;

    expect(result).toBe(expectedUrl);
  });

  test('should return a Gravatar URL with a custom size', async () => {
    const email = 'john.doe@example.com';
    const size = 300;
    const trimmedEmail = email.trim().toLowerCase();
    const hash = crypto.createHash('sha256').update(trimmedEmail).digest('hex');

    const result = await getUserAvatarUrl({ email, size });

    const expectedUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;

    expect(result).toBe(expectedUrl);
  });

  test('should handle emails with leading and trailing spaces', async () => {
    const email = '  john.doe@example.com  ';
    const trimmedEmail = email.trim().toLowerCase();
    const hash = crypto.createHash('sha256').update(trimmedEmail).digest('hex');

    const result = await getUserAvatarUrl({ email });

    const expectedUrl = `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;

    expect(result).toBe(expectedUrl);
  });

  test('should handle empty email string gracefully', async () => {
    const email = '';
    const hash = crypto.createHash('sha256').update(email).digest('hex');

    const result = await getUserAvatarUrl({ email });

    const expectedUrl = `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;

    expect(result).toBe(expectedUrl);
  });
});
