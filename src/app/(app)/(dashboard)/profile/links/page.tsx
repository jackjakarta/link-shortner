import { dbGetLinksByUserId } from '@/db/functions/link';
import { getUser } from '@/utils/auth';

import LinksTable from '../_components/links-table';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const user = await getUser();
  const userLinks = await dbGetLinksByUserId({ userId: user.id });

  return <LinksTable links={userLinks} />;
}
