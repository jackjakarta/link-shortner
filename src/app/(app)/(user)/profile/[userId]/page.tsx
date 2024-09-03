import { getLinksByUserId } from './actions';
import LinksTable from './links-table';

export default async function Page({ params }: { params: { userId: string } }) {
  const links = await getLinksByUserId(params.userId);

  return (
    <main className="p-4 sm:ml-64">
      <LinksTable links={links} />
    </main>
  );
}
