'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { passwordSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { updatePassword } from './actions';

const schema = z
  .object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
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
  });

  async function onSubmit(data: FormData) {
    toast.loading('Saving...');

    try {
      await updatePassword({
        email: userEmail,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast.remove();
      reset();
      toast.success('Password updated successfully');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      reset();
      toast.remove();
      toast.error(error.message);
      console.error('Error updating password:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-3/4">
      <div className="space-y-2">
        <Label htmlFor="Website">Old Password</Label>
        <Input
          id="oldPassword"
          type="password"
          {...register('oldPassword')}
          placeholder="Old Password"
          disabled={isSubmitting}
        />
        {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="Website">New Password</Label>
        <Input
          id="password"
          type="password"
          {...register('newPassword')}
          placeholder="New Password"
          disabled={isSubmitting}
        />
        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
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
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Update Password
      </Button>
    </form>
  );
}
