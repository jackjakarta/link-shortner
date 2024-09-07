'use client';

import SignOutButton from '@/components/signout-button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

type AuthButtonsProps = {
  className?: string;
};

export default function AuthButtons({ className }: AuthButtonsProps) {
  const { data: session } = useSession();

  if (session) {
    return <SignOutButton className={className} />;
  }

  return (
    <Link href="/login" className={className}>
      Sign in
    </Link>
  );
}
