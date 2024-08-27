import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    databaseUrl: z.string().min(1),
    nextauthSecret: z.string().min(1),
    nextauthUrl: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_baseUrl: z.string().min(1),
  },
  runtimeEnv: {
    databaseUrl: process.env.DATABASE_URL,
    nextauthSecret: process.env.NEXTAUTH_SECRET,
    nextauthUrl: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
