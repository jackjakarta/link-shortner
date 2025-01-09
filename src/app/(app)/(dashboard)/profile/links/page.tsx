import LinksTable from '../_components/links-table';
import { getLinksByUserId } from './actions';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const links = await getLinksByUserId();

  return <LinksTable links={links} />;
}
