'use client';

import { cw } from '@/utils/tailwind';
import { signIn } from 'next-auth/react';

type GithubLoginButtonProps = {
  children: React.ReactNode;
  className?: React.ComponentProps<'button'>['className'];
};

export default function GithubLoginButton({ children, className }: GithubLoginButtonProps) {
  return (
    <button className={cw(className)} onClick={() => signIn('github')}>
      {children}
    </button>
  );
}
