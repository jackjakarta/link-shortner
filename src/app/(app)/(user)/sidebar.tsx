'use client';

import ChartsIcon from '@/components/icons/charts';
import ExitIcon from '@/components/icons/exit';
import HamburgerIcon from '@/components/icons/hamburger';
import LinkIcon from '@/components/icons/link';
import LinkChainIcon from '@/components/icons/link-chain';
import WheelIcon from '@/components/icons/wheel';
import { type UserRow } from '@/db/schema';
import { cw } from '@/utils/tailwind';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarMenuProps = {
  user: UserRow;
};

type SidebarMenuItem = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  onClick?: () => void;
};

export default function SidebarMenu({ user }: SidebarMenuProps) {
  const pathname = usePathname();

  const items: SidebarMenuItem[] = [
    {
      title: 'New Link',
      icon: LinkIcon,
      href: '/shorten',
    },
    {
      title: 'Your Links',
      icon: LinkChainIcon,
      href: `/profile/${user.id}`,
    },
    {
      title: 'Analytics',
      icon: ChartsIcon,
      href: `/profile/${user.id}/analytics`,
    },
    {
      title: 'Settings',
      icon: WheelIcon,
      href: `/profile/${user.id}/settings`,
    },
  ];

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <HamburgerIcon className="w-6 h-6" aria-hidden="true" />
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <ul className="space-y-2 font-medium">
            {items.map((item) => (
              <li key={Math.random()}>
                <Link
                  onClick={item.onClick}
                  href={item.href}
                  className={cw(
                    'flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group',
                    pathname === item.href && 'bg-gray-700',
                  )}
                >
                  <item.icon
                    className={cw(
                      'w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white',
                      pathname === item.href && 'text-white',
                    )}
                    aria-hidden="true"
                  />
                  <span className="ms-3">{item.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => signOut()}
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group w-full"
              >
                <ExitIcon
                  className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                  aria-hidden="true"
                />
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
