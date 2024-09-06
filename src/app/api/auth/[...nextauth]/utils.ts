import { dbCreateUser, dbGetUserByEmail, dbGetUserByEmailAndPassword } from '@/db/functions/user';
import { UserRow } from '@/db/schema';
import { env } from '@/env';
import { type AuthOptions } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import { z } from 'zod';

const credentialsSchema = z.object({
  email: z.string().email('This must be a valid email address'),
  password: z.string().min(4, 'You have to provide your password'),
});

export const authOptions = {
  providers: [
    credentialsProvider({
      name: 'credentials',
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
    GitHubProvider({
      clientId: env.githubId,
      clientSecret: env.githubSecret,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github') {
        try {
          await dbGetUserByEmail({ email: user.email! });
        } catch (e) {
          await dbCreateUser({
            id: user.id,
            email: user.email!,
            name: user.name || 'GitHub User',
            passwordHash: '',
            passwordSalt: '',
            provider: account.provider,
          });
          console.debug(e);
          return true;
        }

        return true;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as UserRow;
      return session;
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
