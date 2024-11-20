import { env } from '@/env';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: env.openaiApiKey,
});

export async function moderateText({ content }: { content: string }) {
  try {
    const response = await openai.moderations.create({
      input: content,
    });

    const isFlagged = response.results[0]?.flagged;

    return isFlagged;
  } catch (error) {
    console.error('Error during moderation check:', error);
    return false; // Handle errors appropriately in your application
  }
}
