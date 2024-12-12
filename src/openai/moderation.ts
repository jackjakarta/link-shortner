import { openai } from '.';

export async function moderateText({ content }: { content: string }) {
  try {
    const response = await openai.moderations.create({
      input: content,
    });

    const isFlagged = response.results[0]?.flagged;

    return isFlagged;
  } catch (error) {
    console.error('Error during moderation check:', error);
    return false;
  }
}
