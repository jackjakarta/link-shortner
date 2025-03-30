import { type ShortLinkSource } from '@/db/schema';
import { type ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export function getRefererFromHeaders(headers: ReadonlyHeaders): ShortLinkSource {
  const referer = headers.get('referer') ?? '';
  console.debug({ referer });

  if (referer.includes('email')) {
    return 'email';
  } else if (referer.includes('github')) {
    return 'github';
  } else if (referer.includes('twitter')) {
    return 'twitter';
  } else if (referer.includes('reddit')) {
    return 'reddit';
  } else if (referer.includes('linkedin')) {
    return 'linkedin';
  } else if (referer.includes('facebook')) {
    return 'facebook';
  }

  return 'other';
}

// A function that gets the userAgent from the headers
export function getUserAgentFromHeaders(headers: ReadonlyHeaders): string {
  const userAgent = headers.get('user-agent') ?? '';
  console.debug({ userAgent });

  return userAgent;
}
