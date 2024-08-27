'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { passwordSchema } from './schemas';

const registrationSchema = z
  .object({
    name: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: passwordSchema,
    confirmPassword: passwordSchema,
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
  const [successMessage, setSuccessMessage] = React.useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
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
    } catch (error) {
      if (error instanceof Error) {
        setError('email', { type: 'manual', message: error.message });
      } else {
        setError('email', { type: 'manual', message: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid w-full max-w-md p-10 bg-white rounded-xl drop-shadow-overlay">
        <form className="grid grid-cols-1 gap-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="registration">
            <span className="text-2xl font-medium">Registration</span>
          </label>

          <div className="input input-registration border rounded-lg p-2">
            <input
              type="text"
              {...register('name')}
              className="text-md h-full w-full text-clip bg-transparent outline-none"
              placeholder="Username"
            />
            {errors.name && (
              <p className="text-red-500" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="input input-registration border rounded-lg p-2">
            <input
              type="email"
              {...register('email')}
              className="text-md h-full w-full text-clip bg-transparent outline-none"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="input input-registration border rounded-lg p-2">
            <input
              type="password"
              {...register('password')}
              className="text-md h-full w-full text-clip bg-transparent outline-none"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="input input-registration border rounded-lg p-2">
            <input
              type="password"
              {...register('confirmPassword')}
              className="text-md h-full w-full text-clip bg-transparent outline-none"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {successMessage && (
            <p className="text-green-500" role="success">
              {successMessage}
            </p>
          )}
          {error && (
            <p className="text-red-500" role="alert">
              {error}
            </p>
          )}

          <button className="btn btn-primary w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>

          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-grey-600 font-bold underline py-2 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
