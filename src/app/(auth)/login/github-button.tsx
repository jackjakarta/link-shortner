'use client';

import { cw } from '@/utils/tailwind';
import { signIn } from 'next-auth/react';
import React from 'react';

type GithubLoginButtonProps = {
  children: React.ReactNode;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  className?: React.ComponentProps<'button'>['className'];
};

export default function GithubLoginButton({
  children,
  isLoading,
  setIsLoading,
  className,
}: GithubLoginButtonProps) {
  function handleLogin() {
    setIsLoading(true);
    signIn('github');
  }

  return (
    <button
      disabled={isLoading}
      className={cw(className, 'disabled:cursor-not-allowed')}
      onClick={handleLogin}
    >
      {children}
    </button>
  );
}
