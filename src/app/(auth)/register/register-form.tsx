'use client';

import EyeClosedIcon from '@/components/icons/eye-closed';
import EyeOpenIcon from '@/components/icons/eye-open';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { emailSchema, passwordSchema, userNameSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const registrationSchema = z
  .object({
    name: userNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

type RegistrationProps = {
  error?: string;
};

export default function RegisterForm({ error }: RegistrationProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  async function onSubmit(data: RegistrationFormData) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      setSuccessMessage('Registration successful! Please check your email to verify your account.');
      router.push('/');
      toast.success('Registration successful! Please check your email to verify your account.');
    } catch (error) {
      if (error instanceof Error) {
        setError('email', { type: 'manual', message: error.message });
      } else {
        setError('email', { type: 'manual', message: 'An unexpected error occurred' });
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900 dark:bg-gray-800">
      <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Label htmlFor="name" className="text-2xl font-medium text-center">
            Registration
          </Label>

          <div className="space-y-2">
            <Label htmlFor="name">Username</Label>
            <Input
              id="name"
              type="text"
              placeholder="Username"
              {...register('name')}
              className="border border-input"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register('email')}
              className="border border-input"
              disabled={isSubmitting}
            />
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

          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

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
