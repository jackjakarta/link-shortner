import { getLinksByUserId } from './actions';
import LinksTable from './links-table';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { userId: string } }) {
  const links = await getLinksByUserId(params.userId);

  return <LinksTable links={links} />;
}
