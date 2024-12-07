'use client';

import { cw } from '@/utils/tailwind';
import { signIn } from 'next-auth/react';

type GithubLoginButtonProps = {
  children: React.ReactNode;
  className?: React.ComponentProps<'button'>['className'];
};

export default function DiscordLoginButton({ children, className }: GithubLoginButtonProps) {
  return (
    <button className={cw(className)} onClick={() => signIn('discord')}>
      {children}
    </button>
  );
}
