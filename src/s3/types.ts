import { z } from 'zod';

export const bucketNameSchema = z.literal('media');
export type BucketName = z.infer<typeof bucketNameSchema>;
