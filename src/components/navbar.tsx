'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';

import AuthButtons from './auth-buttons';
import KlikrLogo from './icons/logo';

export default function Navbar() {
  const { data: session } = useSession();
  const navItems = [{ name: 'Home', href: '/' }];

  if (session) {
    navItems.push({ name: 'Profile', href: '/profile' });
  }

  return (
    <nav className="border-b-2 border-indigo-700 bg-gray-300">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-3">
          <KlikrLogo className="w-9 h-9" />
          <span className="text-black text-3xl font-semibold">Klikr</span>
        </Link>
        <div className="hidden md:flex md:items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-black font-medium transition-colors hover:text-gray-500"
            >
              {item.name}
            </Link>
          ))}
          <AuthButtons className="py-2 px-4 text-sm bg-black hover:bg-gray-800 text-white rounded-full" />
        </div>
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
                <AuthButtons className="py-2 px-4 text-sm bg-white hover:bg-gray-100 text-black rounded-full" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
