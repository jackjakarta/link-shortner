import Avatar from '@/components/ui/avatar';
import { dbGetUserProfileByUserId } from '@/db/functions/profile';
import { getUser } from '@/utils/auth';
import { getUserAvatarUrl } from '@/utils/user';
import Link from 'next/link';

import UserProfileSettingsForm from './edit-profile-form';
import SettingsNavbar from './settings-navbar';

export default async function Page() {
  const user = await getUser();

  const [userProfile, avatarUrl] = await Promise.all([
    dbGetUserProfileByUserId({ userId: user.id }),
    getUserAvatarUrl({ email: user.email }),
  ]);

  if (userProfile === undefined) {
    throw new Error('User profile not found');
  }

  return (
    <main className="px-8 py-1 mt-4 max-w-[35rem]">
      <SettingsNavbar userId={user.id} />
      <div className="flex flex-col justify-center items-center space-y-4 mb-4">
        <Avatar src={avatarUrl} alt="avatar" width={80} height={80} />
        <span className="text-sm font-medium">
          You can manage your avatar with{' '}
          <Link
            className="text-gray-900 hover:text-gray-600"
            href="https://gravatar.com/profile"
            target="_blank"
          >
            Gravatar
          </Link>
        </span>
      </div>
      <div className="flex w-full gap-4">
        <UserProfileSettingsForm user={user} profile={userProfile} />
      </div>
    </main>
  );
}
