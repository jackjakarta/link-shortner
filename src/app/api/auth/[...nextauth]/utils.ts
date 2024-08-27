import { dbGetUserByEmailAndPassword, dbGetUserById } from '@/db/functions/user';
import { UserRow } from '@/db/schema';
import { type AuthOptions } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

const credentialsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const authOptions = {
  providers: [
    credentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const creds = credentialsSchema.parse(credentials);
          const user = await dbGetUserByEmailAndPassword(creds.email, creds.password);
          return user;
        } catch (e) {
          console.error('Login error:', e);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    session({ token, session }) {
      session.user = token.user as UserRow;
      return session;
    },
    async jwt({ token, user }) {
      const _user = (token.user ?? user) as UserRow;

      try {
        return {
          user: await dbGetUserById(_user.id),
        };
      } catch {
        throw new Error(`Could not find user with id: ${_user.id}`);
      }
    },
  },
  jwt: {
    maxAge: 15 * 24 * 60 * 60, // 15 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
} satisfies AuthOptions;
