import { getUser } from '@/utils/auth';

import SettingsNavbar from '../settings-navbar';
import UpdatePasswordForm from './update-password-form';

export default async function Page() {
  const user = await getUser();

  return (
    <>
      <SettingsNavbar userId={user.id} />
      <main className="px-8 py-1 mt-4 max-w-[35rem]">
        <p>You can change your password here</p>
        <div className="flex w-full gap-4 mt-4">
          <UpdatePasswordForm userEmail={user.email} />
        </div>
      </main>
    </>
  );
}
