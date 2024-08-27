import { dbGetLinkByShortPath, dbUpdateLinkClickCount } from '@/db/functions/link';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { shortPath: string } }) {
  const link = await dbGetLinkByShortPath(params.shortPath);

  if (link === undefined) {
    redirect('/');
  }

  await dbUpdateLinkClickCount(link.id);

  redirect(`${link.longUrl}`);
}
