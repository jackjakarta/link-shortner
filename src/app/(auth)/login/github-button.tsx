'use client';

import { signIn } from 'next-auth/react';

type GithubLoginButtonProps = {
  className?: React.ComponentProps<'button'>['className'];
};

export default function GithubLoginButton({ className }: GithubLoginButtonProps) {
  return (
    <button className={className} onClick={() => signIn('github')}>
      SignIn
    </button>
  );
}
