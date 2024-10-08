import Avatar from '@/components/common/avatar';
import { dbGetUserProfileByUserId } from '@/db/functions/profile';
import { getUser } from '@/utils/auth';
import { getUserAvatarUrl } from '@/utils/user';

import UserProfileSettingsForm from './edit-profile-form';

export default async function UserProfileSettingsPage() {
  const user = await getUser();
  const userProfile = await dbGetUserProfileByUserId({ userId: user.id });
  const avatarUrl = await getUserAvatarUrl(user.email);

  if (userProfile === undefined) {
    throw new Error('User profile not found');
  }

  return (
    <main className="px-3 py-2">
      <Avatar src={avatarUrl} alt={user.email} />
      <UserProfileSettingsForm user={user} profile={userProfile} />
    </main>
  );
}
