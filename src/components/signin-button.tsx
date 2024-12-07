import Link from 'next/link';
import React from 'react';

type AuthButtonsProps = {
  className?: string;
};

export default function SignInButton({ className }: AuthButtonsProps) {
  return (
    <Link href="/login" className={className}>
      Sign in
    </Link>
  );
}
