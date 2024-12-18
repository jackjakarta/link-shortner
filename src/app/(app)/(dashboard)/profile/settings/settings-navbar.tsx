'use client';

import { cw } from '@/utils/tailwind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingsNavbar() {
  const pathname = usePathname();
  const itemClassName = 'text-lg font-light text-gray-900 hover:text-gray-400';

  return (
    <nav className="flex w-full gap-4 mb-8">
      <Link
        className={cw(itemClassName, pathname === `/profile/settings` && 'font-medium')}
        href={`/profile/settings`}
      >
        Profile
      </Link>
      <Link
        className={cw(itemClassName, pathname === `/profile/settings/password` && 'font-medium')}
        href={`/profile/settings/password`}
      >
        Password
      </Link>
      <Link
        className={cw(
          itemClassName,
          (pathname === `/profile/settings/api` || pathname === `/profile/settings/api/usage`) &&
            'font-medium',
        )}
        href={`/profile/settings/api`}
      >
        API Keys
      </Link>
    </nav>
  );
}
