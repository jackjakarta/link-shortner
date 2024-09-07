'use client';

import SignOutButton from '@/components/signout-button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return <SignOutButton />;
  }

  return (
    <Link href="/login" className="btn btn-primary">
      Sign in
    </Link>
  );
}
