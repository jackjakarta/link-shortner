import InfoBar from '@/components/info-bar';
import { getUser } from '@/utils/auth';

import SidebarMenu from './sidebar';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <>
      <SidebarMenu user={user} />
      {!user.emailVerified && (
        <InfoBar className="bg-blue-500 text-white py-2.5 px-4">
          <h1 className="sm:ml-64">Please verify your email.</h1>
        </InfoBar>
      )}
      <main className="p-4 sm:ml-64">{children}</main>
    </>
  );
}
