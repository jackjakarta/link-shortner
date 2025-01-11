'use client';

import EyeClosedIcon from '@/components/icons/eye-closed';
import EyeOpenIcon from '@/components/icons/eye-open';
import Spinner from '@/components/icons/spinner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { emailSchema, passwordSchema, userNameSchema } from '@/utils/schemas';
import { cw } from '@/utils/tailwind';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useRegisterForm } from './use-register-form';

const registrationSchema = z
  .object({
    name: userNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    isNewsletterSub: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegisterForm() {
  const router = useRouter();

  const {
    isPasswordVisible,
    isConfirmPasswordVisible,
    isCheckingEmail,
    isEmailValid,
    passwordStrength,
    passwordFeedback,
    handleEmailChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    evaluatePasswordStrength,
  } = useRegisterForm();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  async function onSubmit(data: RegistrationFormData) {
    const { email, name, password, isNewsletterSub } = data;

    toast.loading('Registering...');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
          isNewsletterSub,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      router.push('/');
      toast.remove();
      toast.success('Registration successful! Please check your email to verify your account.');
    } catch (error) {
      if (error instanceof Error) {
        setError('email', { type: 'manual', message: error.message });
      } else {
        setError('email', { type: 'manual', message: 'An unexpected error occurred' });
      }

      toast.remove();
      toast.error('Failed to register');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Label className="text-2xl font-medium text-center">Registration</Label>

          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input
              id="name"
              type="text"
              placeholder="Username"
              {...register('name')}
              className="border border-input focus:outline-none"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2 border rounded-md">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register('email')}
                onChange={handleEmailChange}
                className="focus:outline-none border-input"
                disabled={isSubmitting}
              />

              {isCheckingEmail && <Spinner className="w-5 h-5 text-red-500 mr-2" />}
              {isEmailValid === true && <CheckIcon className="text-green-500 mr-2" />}
              {isEmailValid === false && !isCheckingEmail && <X className="text-red-500 mr-2" />}
            </div>
            {isEmailValid === false && !isCheckingEmail && (
              <p className="text-red-500 text-sm">There is already an account with this email</p>
            )}
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
              className="border border-input"
              onChange={(e) => evaluatePasswordStrength(e.target.value)}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9"
            >
              {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            {passwordStrength > 0 && (
              <div className="mt-2">
                <div className="h-2 w-full bg-gray-300 rounded">
                  <div
                    className={cw(
                      'h-2 rounded',
                      passwordStrength === 0
                        ? 'bg-red-500'
                        : passwordStrength === 1
                          ? 'bg-orange-500'
                          : passwordStrength === 2
                            ? 'bg-yellow-500'
                            : passwordStrength === 3
                              ? 'bg-blue-500'
                              : 'bg-green-500',
                    )}
                    style={{ width: `${(passwordStrength + 1) * 20}%` }}
                  />
                </div>
                <p className="text-sm mt-1">
                  <p className="text-sm mt-1">
                    {passwordStrength === 3
                      ? 'Strong enough'
                      : passwordStrength === 4
                        ? 'Super strong'
                        : passwordFeedback}
                  </p>
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              {...register('confirmPassword')}
              className="border border-input"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-9"
            >
              {isConfirmPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isNewsletterSub"
              {...register('isNewsletterSub', {
                setValueAs: (value: string) =>
                  value === 'on' ? true || value === 'off' : false || value,
              })}
              className="bg-black"
              disabled={isSubmitting}
            />
            <Label htmlFor="isNewsletterSub">Subscribe to Newsletter</Label>
            {errors.isNewsletterSub && (
              <p className="text-red-500 text-sm">{errors.isNewsletterSub.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Register
          </Button>

          <p className="text-gray-600 text-sm text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-gray-600 font-bold underline hover:text-gray-400">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
