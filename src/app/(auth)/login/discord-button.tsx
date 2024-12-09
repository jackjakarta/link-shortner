'use client';

import { cw } from '@/utils/tailwind';
import { signIn } from 'next-auth/react';
import React from 'react';

type GithubLoginButtonProps = {
  children: React.ReactNode;
  isFormSubmitting?: boolean;
  className?: React.ComponentProps<'button'>['className'];
};

export default function DiscordLoginButton({
  children,
  isFormSubmitting,
  className,
}: GithubLoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  function handleLogin() {
    setIsLoading(true);
    signIn('discord');
  }

  const disabledState = isLoading || isFormSubmitting;

  return (
    <button
      disabled={disabledState}
      className={cw(className, 'disabled:cursor-not-allowed')}
      onClick={handleLogin}
    >
      {children}
    </button>
  );
}
