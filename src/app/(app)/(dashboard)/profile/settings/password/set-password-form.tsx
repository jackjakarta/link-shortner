'use client';

import { useFormTools } from '@/components/hooks/use-form-tools';
import EyeClosedIcon from '@/components/icons/eye-closed';
import EyeOpenIcon from '@/components/icons/eye-open';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { passwordSchema } from '@/utils/schemas';
import { cw } from '@/utils/tailwind';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { setPassword } from './actions';

const schema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function SetPasswordForm({ userEmail }: { userEmail: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    isPasswordVisible,
    isConfirmPasswordVisible,
    passwordStrength,
    passwordFeedback,
    evaluatePasswordStrength,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useFormTools();

  const router = useRouter();

  async function onSubmit(data: FormData) {
    toast.loading('Saving...');

    try {
      await setPassword({
        email: userEmail,
        newPassword: data.newPassword,
      });
      toast.remove();
      reset();
      router.refresh();
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
      <div className="space-y-2 relative">
        <Label htmlFor="newPassword">Set password</Label>
        <Input
          id="newPassword"
          type={isPasswordVisible ? 'text' : 'password'}
          {...register('newPassword')}
          onChange={(e) => evaluatePasswordStrength(e.target.value)}
          placeholder="New Password"
          className="border border-input"
          disabled={isSubmitting}
        />
        <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-9">
          {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </button>
        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
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
        <Label htmlFor="confirmPassword">Password confirmation</Label>
        <Input
          id="confirmPassword"
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          {...register('confirmPassword')}
          placeholder="Confirm Password"
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

      <Button type="submit" disabled={isSubmitting}>
        Set Password
      </Button>
    </form>
  );
}
