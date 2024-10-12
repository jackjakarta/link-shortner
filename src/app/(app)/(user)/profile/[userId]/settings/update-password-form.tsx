'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { passwordSchema } from '@/utils/schemas';
import { sleep } from '@/utils/sleep';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { updatePassword } from './actions';

const schema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function UpdatePasswordForm({ userEmail }: { userEmail: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // defaultValues: {
    //   bio: profile.bio ?? undefined,
    //   location: profile.location ?? undefined,
    //   website: profile.website ?? undefined,
    // },
  });

  async function onSubmit(data: FormData) {
    toast.loading('Saving...');

    try {
      await updatePassword({
        email: userEmail,
        password: data.password,
      });
      await sleep(500);
      toast.remove();
      reset();
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-3/4">
      <div className="space-y-2">
        <Label htmlFor="Website">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          placeholder="New Password"
          disabled={isSubmitting}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="Website">Password confirmation</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          placeholder="Confirm Password"
          disabled={isSubmitting}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <Button
        className="disabled:bg-gray-700 disabled:cursor-not-allowed"
        type="submit"
        disabled={isSubmitting}
      >
        Update Password
      </Button>
    </form>
  );
}
