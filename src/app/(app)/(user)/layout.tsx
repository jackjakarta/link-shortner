import { getUser } from '@/utils/auth';

import SidebarMenu from './sidebar';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <>
      <SidebarMenu user={user} />
      {children}
    </>
  );
}
