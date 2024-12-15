'use client';

import AccountIcon from '@/components/icons/account';
import ChartsIcon from '@/components/icons/charts';
import ExitIcon from '@/components/icons/exit';
import HamburgerIcon from '@/components/icons/hamburger';
import LinkIcon from '@/components/icons/link';
import LinkChainIcon from '@/components/icons/link-chain';
import { cw } from '@/utils/tailwind';
import { type ObscuredUser } from '@/utils/user';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useSidebar } from './hooks/use-sidebar';
import DashboardIcon from './icons/dashboard';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import SoonLabel from './ui/soon-label';

type SidebarMenuProps = ObscuredUser & { avatarUrl: string };

type SidebarMenuItem = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  onClick?: () => void;
};

export default function SidebarMenu({
  id,
  name,
  email,
  isSuperAdmin,
  avatarUrl,
}: SidebarMenuProps) {
  const pathname = usePathname();

  const { isOpen, setIsOpen, sidebarRef, handleLinkClick } = useSidebar();

  const items: SidebarMenuItem[] = [
    {
      title: 'New Link',
      icon: LinkIcon,
      href: '/shorten',
    },
    {
      title: 'Account',
      icon: AccountIcon,
      href: `/profile/${id}/settings`,
    },
    {
      title: 'Your Links',
      icon: LinkChainIcon,
      href: `/profile/${id}`,
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="default-sidebar"
        aria-expanded={isOpen}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <HamburgerIcon className="w-6 h-6" aria-hidden="true" />
      </button>

      <aside
        ref={sidebarRef}
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-white">Hello, {name}!</span>
              <span className="text-xs text-white">{email}</span>
            </div>
            <div className="flex-grow" />
            <Avatar className="w-9 h-9">
              <AvatarImage src={avatarUrl} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <ul className="space-y-2 font-medium pt-3">
            {isSuperAdmin && (
              <li>
                <Link
                  onClick={handleLinkClick}
                  href="/admin"
                  className={cw(
                    'flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group',
                  )}
                >
                  <DashboardIcon
                    className={cw(
                      'w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white',
                    )}
                    aria-hidden="true"
                  />
                  <span className="ms-3">Admin</span>
                </Link>
              </li>
            )}
            {items.map((item) => (
              <li key={item.title}>
                <Link
                  onClick={item.onClick ?? handleLinkClick}
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
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group w-full">
                    <ChartsIcon
                      className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span className="ms-3">Analytics</span>
                    <div className="flex-grow" />
                    <SoonLabel />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="flex w-[7rem] text-xs text-gray-600 font-light py-1">
                  Available soon
                </HoverCardContent>
              </HoverCard>
            </li>

            <li>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center p-2 mt-2 rounded-lg text-white hover:bg-gray-700 group w-full"
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
