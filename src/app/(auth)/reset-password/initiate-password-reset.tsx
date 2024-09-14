'use client';

import { dbGetUserByEmail } from '@/db/functions/user';
import { sendUserActionEmail } from '@/email/send';
import { emailSchema } from '@/utils/schemas';
import { cw } from '@/utils/tailwind';
import { zodResolver } from '@hookform/resolvers/zod';
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

      toast.success('Check your email for a password reset link');
    } catch (error) {
      toast.error(`Could not send reset password email to '${email}'`);
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-md shadow-sm"
    >
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          {...register('email')}
          className={cw(
            'mt-1 block w-full p-2 border rounded-md shadow-sm',
            errors.email ? 'border-red-500' : 'border-gray-300',
          )}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  );
}
