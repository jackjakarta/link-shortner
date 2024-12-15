'use client';

import { cw } from '@/utils/tailwind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ApiNavbarProps = {
  userId: string;
};

export default function ApiNavbar({ userId }: ApiNavbarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'API Keys',
      href: `/profile/${userId}/settings/api`,
    },
    {
      label: 'Usage',
      href: `/profile/${userId}/settings/api/usage`,
    },
  ];

  return (
    <nav className="flex w-full gap-4 mt-8">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          className={cw(
            'text-md font-light text-gray-900 hover:text-gray-400',
            pathname === item.href && 'font-medium',
          )}
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
