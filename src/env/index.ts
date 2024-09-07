import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    databaseUrl: z.string().min(1),
    nextauthSecret: z.string().min(1),
    nextauthUrl: z.string().min(1),
    githubId: z.string().min(1),
    githubSecret: z.string().min(1),
    awsAccessKeyId: z.string().min(1),
    awsSecretAccessKey: z.string().min(1),
    awsRegion: z.string().min(1),
    emailAccount: z.string().email(),
  },
  client: {
    NEXT_PUBLIC_baseUrl: z.string().min(1),
  },
  runtimeEnv: {
    databaseUrl: process.env.DATABASE_URL,
    nextauthSecret: process.env.NEXTAUTH_SECRET,
    nextauthUrl: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    githubId: process.env.GITHUB_ID,
    githubSecret: process.env.GITHUB_SECRET,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    emailAccount: process.env.EMAIL_ACCOUNT,
  },
});
