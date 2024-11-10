'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UserProfileDropdown({ avatarUrl }: { avatarUrl: string }) {
  const router = useRouter();

  const handleLogout = () => {
    signOut().then(() => router.push('/login'));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Image
            src={avatarUrl}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => router.push('/profile')}>Your Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/analytics')}>Analytics</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/account')}>Account</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
