'use client';

import { cw } from '@/utils/tailwind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const itemClassName = 'text-lg font-light text-gray-900 hover:text-gray-400';

export default function SettingsNavbar() {
  const pathname = usePathname();

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
        className={cw(itemClassName, pathname.includes(`/profile/settings/api`) && 'font-medium')}
        href={`/profile/settings/api`}
      >
        API Keys
      </Link>
    </nav>
  );
}
