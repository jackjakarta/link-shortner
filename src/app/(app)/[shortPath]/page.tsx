import { dbGetLinkByShortPath, dbUpdateLinkClickStats } from '@/db/functions/link';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { shortPath: string } }) {
  const link = await dbGetLinkByShortPath({ shortPath: params.shortPath });

  if (link === undefined) {
    redirect('/');
  }

  await dbUpdateLinkClickStats({ linkId: link.id });

  redirect(link.longUrl);
}
