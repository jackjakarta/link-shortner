import { getLinksByUserId } from './actions';
import LinksTable from './links-table';

export default async function Page({ params }: { params: { userId: string } }) {
  const links = await getLinksByUserId(params.userId);

  return <LinksTable links={links} />;
}
