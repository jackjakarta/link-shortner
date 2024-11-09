'use client';

import EyeClosedIcon from '@/components/icons/eye-closed';
import EyeOpenIcon from '@/components/icons/eye-open';
import GithubIcon from '@/components/icons/github';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import GithubLoginButton from './github-button';

const loginFormSchema = z.object({
  email: z.string().email('This must be a valid email address'),
  password: z.string().min(4, 'You have to provide your password'),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const onSubmit = async (data: LoginFormData) => {
    const { email: _email, password } = data;
    const email = _email.trim().toLowerCase();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    const loginSuccess = result === undefined || result.ok;

    if (loginSuccess) {
      router.refresh();
    } else {
      setError('password', {
        type: 'manual',
        message: 'Wrong email or password',
      });
    }
  };

  return (
    <main className="w-full flex items-center justify-center min-h-screen">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="Your email"
              {...register('email')}
              className="border border-input"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Your password"
              {...register('password')}
              className="border border-input"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9"
            >
              {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
            )}
          </div>
          <div className="flex justify-between items-center mt-2">
            <Link href="/reset-password" className="text-sm text-black hover:underline">
              Forgot password?
            </Link>
            <Link href="/register" className="text-sm text-black hover:underline">
              Sign up
            </Link>
          </div>
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>
        <div className="mt-4 w-full">
          <GithubLoginButton className="flex items-center justify-center gap-4 w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none">
            <GithubIcon />
            <span>Sign in with GitHub</span>
          </GithubLoginButton>
        </div>
      </div>
    </main>
  );
}
