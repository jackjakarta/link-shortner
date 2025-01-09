'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

type SignOutButtonProps = React.ComponentProps<'button'> & {
  children?: React.ReactNode;
};

export default function SignOutButton({ children, ...props }: SignOutButtonProps) {
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })} {...props}>
      {children ?? 'Sign out'}
    </button>
  );
}
