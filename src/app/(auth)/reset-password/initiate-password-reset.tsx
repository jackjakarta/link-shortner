'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dbGetUserByEmail } from '@/db/functions/user';
import { sendUserActionEmail } from '@/email/send';
import { emailSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  email: emailSchema,
});

type FormData = z.infer<typeof schema>;

export default function InitiatePasswordResetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  async function onSubmit(data: FormData) {
    const { email } = data;
    const user = await dbGetUserByEmail({ email });

    if (user === undefined) {
      toast.error(`User with email '${email}' not found`);
      console.error(`User with email '${email}' not found`);
      return;
    }

    try {
      const result = await sendUserActionEmail({ to: email, action: 'reset-password' });

      if (!result.success) {
        throw new Error(result.error);
      }

      router.push('/login');
      toast.success('Check your email for a password reset link');
    } catch (error) {
      toast.error(`Could not send reset password email to '${email}'`);
      toast.error('There was an error. Please try again.');
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-white w-full max-w-[500px] p-8 border border-gray-300 rounded-md shadow-md space-y-6 mx-auto"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          className={errors.email ? 'border-red-500' : 'border border-input'}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
