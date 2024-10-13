'use client';

import { cw } from '@/utils/tailwind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SettingsNavbarProps = {
  userId: string;
};

export default function SettingsNavbar({ userId }: SettingsNavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex w-full gap-4 mb-4">
      <Link
        className={cw(
          'text-gray-900 hover:text-gray-600',
          pathname === `/profile/${userId}/settings` && 'font-bold',
        )}
        href={`/profile/${userId}/settings`}
      >
        Profile
      </Link>
      <Link
        className={cw(
          'text-gray-900 hover:text-gray-600',
          pathname === `/profile/${userId}/settings/password` && 'font-bold',
        )}
        href={`/profile/${userId}/settings/password`}
      >
        Password
      </Link>
    </nav>
  );
}
