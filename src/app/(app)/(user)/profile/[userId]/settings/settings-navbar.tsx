'use client';

import { cw } from '@/utils/tailwind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SettingsNavbarProps = {
  userId: string;
};

export default function SettingsNavbar({ userId }: SettingsNavbarProps) {
  const pathname = usePathname();
  const itemClassName = 'text-lg font-light text-gray-900 hover:text-gray-600';

  return (
    <nav className="flex w-full gap-4 mb-8">
      <Link
        className={cw(itemClassName, pathname === `/profile/${userId}/settings` && 'font-medium')}
        href={`/profile/${userId}/settings`}
      >
        Profile
      </Link>
      <Link
        className={cw(
          itemClassName,
          pathname === `/profile/${userId}/settings/password` && 'font-medium',
        )}
        href={`/profile/${userId}/settings/password`}
      >
        Password
      </Link>
    </nav>
  );
}
