// import { getValidSession } from '@/utils/auth';
import { getUser } from '@/utils/auth';

import SidebarMenu from './sidebar';

export default async function Layout({ children }: { children: React.ReactNode }) {
  //   await getValidSession();
  const user = await getUser();

  return (
    <>
      <SidebarMenu user={user} />
      {children}
    </>
  );
}
