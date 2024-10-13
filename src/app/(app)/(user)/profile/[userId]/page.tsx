import LinksTable from './_components/links-table';
import { getLinksByUserId } from './actions';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { userId: string } }) {
  const links = await getLinksByUserId({ userId: params.userId });

  return <LinksTable links={links} />;
}
