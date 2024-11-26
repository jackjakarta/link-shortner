import { env } from '@/env';
import OpenAI from 'openai';

export const openAi = new OpenAI({
  apiKey: env.openaiApiKey,
});
