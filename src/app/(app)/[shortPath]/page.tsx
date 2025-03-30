import {
  dbCreateLinkClick,
  dbGetLinkByShortPath,
  dbUpdateLinkClickStats,
} from '@/db/functions/link';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { z } from 'zod';

import { getRefererFromHeaders, getUserAgentFromHeaders } from './utils';

const pageContextSchema = z.object({
  params: z.object({
    shortPath: z.string(),
  }),
});

export default async function Page(context: unknown) {
  const parsedContext = pageContextSchema.safeParse(context);

  if (!parsedContext.success) {
    redirect('/');
  }

  const { shortPath } = parsedContext.data.params;
  const link = await dbGetLinkByShortPath({ shortPath });

  if (link === undefined) {
    redirect('/');
  }

  const reqHeaders = headers();
  const referer = getRefererFromHeaders(reqHeaders);
  const userAgent = getUserAgentFromHeaders(reqHeaders);
  console.debug({ referer, userAgent });

  await Promise.all([
    dbUpdateLinkClickStats({ linkId: link.id }),
    dbCreateLinkClick({
      shortLinkId: link.id,
      source: referer,
    }),
  ]);

  redirect(link.longUrl);
}
