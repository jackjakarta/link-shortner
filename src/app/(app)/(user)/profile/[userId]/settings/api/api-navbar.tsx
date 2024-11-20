'use client';

import { cw } from '@/utils/tailwind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ApiNavbarProps = {
  userId: string;
};

export default function ApiNavbar({ userId }: ApiNavbarProps) {
  const pathname = usePathname();
  const itemClassName = 'text-md font-light text-gray-900 hover:text-gray-400';

  return (
    <nav className="flex w-full gap-4 mt-8">
      <Link
        className={cw(
          itemClassName,
          pathname === `/profile/${userId}/settings/api` && 'font-medium',
        )}
        href={`/profile/${userId}/settings/api`}
      >
        API Keys
      </Link>
      <Link
        className={cw(
          itemClassName,
          pathname === `/profile/${userId}/settings/api/usage` && 'font-medium',
        )}
        href={`/profile/${userId}/settings/api/usage`}
      >
        Usage
      </Link>
    </nav>
  );
}
