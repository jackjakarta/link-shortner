import { env } from '@/env';

export const devMode = env.devMode === 'true' ? true : false;
