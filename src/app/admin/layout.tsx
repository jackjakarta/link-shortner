import { getUser } from '@/utils/auth';
import { obscureUser } from '@/utils/user';

import AdminProvider from './_components/admin-provider';
import AdminSidebarMenu from './_components/sidebar';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user.isSuperAdmin) {
    throw new Error('You are not authorized to view this page');
  }

  const obscuredUser = await obscureUser({ user });

  return (
    <AdminProvider user={obscuredUser}>
      <AdminSidebarMenu />
      <main className="p-4 sm:pl-64">{children}</main>
    </AdminProvider>
  );
}
