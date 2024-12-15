import { getUser } from '@/utils/auth';

import SettingsNavbar from '../settings-navbar';
import SetPasswordForm from './set-password-form';
import UpdatePasswordForm from './update-password-form';

export default async function Page() {
  const user = await getUser();
  const hasNoPassword = user.provider !== null && user.passwordSalt === '';

  return (
    <div className="px-8 py-1 mt-4 max-w-[35rem]">
      <SettingsNavbar userId={user.id} />
      <div className="flex flex-col w-full gap-4 mt-4">
        {hasNoPassword ? (
          <>
            <p>You can set your password here</p>
            <SetPasswordForm userEmail={user.email} />
          </>
        ) : (
          <>
            <p>You can change your password here</p>
            <UpdatePasswordForm userEmail={user.email} />
          </>
        )}
      </div>
    </div>
  );
}
