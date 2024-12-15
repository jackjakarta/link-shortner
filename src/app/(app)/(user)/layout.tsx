import InfoBar from '@/components/info-bar';
import ResendVerificationButton from '@/components/resend-verification-button';
import SidebarMenu from '@/components/sidebar';
import { getUser } from '@/utils/auth';
import { getUserAvatarUrl, obscureUser } from '@/utils/user';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  const [avatarUrl, obscuredUser] = await Promise.all([
    getUserAvatarUrl({ email: user.email }),
    obscureUser({ user }),
  ]);

  return (
    <>
      <SidebarMenu {...obscuredUser} avatarUrl={avatarUrl} />
      {!user.emailVerified && (
        <InfoBar className="bg-indigo-900 text-gray-200 py-2.5 px-4">
          <h1 className="sm:ml-64">
            Please verify your email. If you haven't recieved an email click on the resend button.{' '}
            <ResendVerificationButton
              className="bg-black hover:bg-gray-500 text-gray-200 rounded-lg px-2 py-0"
              userEmail={user.email}
            />
          </h1>
        </InfoBar>
      )}
      <main className="p-4 sm:ml-64">{children}</main>
    </>
  );
}
