'use client';

import { cw } from '@/utils/tailwind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ApiNavbar() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'API Keys',
      href: `/profile/settings/api`,
    },
    {
      label: 'Usage',
      href: `/profile/settings/api/usage`,
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
