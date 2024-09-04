import { dbGetLinkByShortPath, dbUpdateLinkClickStats } from '@/db/functions/link';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { shortPath: string } }) {
  const link = await dbGetLinkByShortPath(params.shortPath);

  if (link === undefined) {
    redirect('/');
  }

  await dbUpdateLinkClickStats(link.id);

  redirect(`${link.longUrl}`);
}
