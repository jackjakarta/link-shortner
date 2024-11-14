import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    databaseUrl: z.string().min(1),
    nextauthSecret: z.string().min(1),
    nextauthUrl: z.string().min(1),
    githubId: z.string().min(1),
    githubSecret: z.string().min(1),
    emailAccount: z.string().email(),
    mailJetApiKey: z.string().min(1),
    mailJetApiSecret: z.string().min(1),
    awsAccessKeyId: z.string().min(1),
    awsBucketUrl: z.string().min(1),
    awsSecretAccessKey: z.string().min(1),
    awsS3EndpointUrl: z.string().min(1),
    awsRegion: z.string().min(1),
    awsBucketName: z.string().min(1),
    debug: z.string().default('false'),
  },
  client: {
    NEXT_PUBLIC_baseUrl: z.string().min(1),
    NEXT_PUBLIC_passwordValidator: z.enum(['weak', 'medium', 'strong']).default('medium'),
  },
  runtimeEnv: {
    databaseUrl: process.env.DATABASE_URL,
    nextauthSecret: process.env.NEXTAUTH_SECRET,
    nextauthUrl: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    githubId: process.env.GITHUB_ID,
    githubSecret: process.env.GITHUB_SECRET,
    emailAccount: process.env.EMAIL_ACCOUNT,
    mailJetApiKey: process.env.MJ_APIKEY_PUBLIC,
    mailJetApiSecret: process.env.MJ_APIKEY_PRIVATE,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsBucketUrl: process.env.AWS_BUCKET_URL,
    awsS3EndpointUrl: process.env.AWS_S3_ENDPOINT_URL,
    awsRegion: process.env.AWS_REGION,
    awsBucketName: process.env.AWS_STORAGE_BUCKET_NAME,
    debug: process.env.DEBUG,
    NEXT_PUBLIC_passwordValidator: process.env.NEXT_PUBLIC_PASSWORD_VALIDATOR,
  },
});
