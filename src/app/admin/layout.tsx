import { getUser } from '@/utils/auth';
import { getUserAvatarUrl, obscureUser } from '@/utils/user';
import { notFound } from 'next/navigation';

import AdminProvider from './_components/admin-provider';
import AdminSidebarMenu from './_components/sidebar';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user.isSuperAdmin) {
    return notFound();
  }

  const [avatarUrl, obscuredUser] = await Promise.all([
    getUserAvatarUrl({ email: user.email }),
    obscureUser({ user }),
  ]);

  return (
    <AdminProvider user={obscuredUser}>
      <AdminSidebarMenu avatarUrl={avatarUrl} />
      <main className="p-4 sm:pl-64">{children}</main>
    </AdminProvider>
  );
}
