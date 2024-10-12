'use client';

import { dbUpdateUserPassword } from '@/db/functions/user';
import { type TokenRow } from '@/db/schema';
import { sendUserActionInformationEmail } from '@/email/send';
import { emailSchema, passwordSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

type ResetPasswordFormProps = TokenRow;

const resetPasswordSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'The passwords do not match',
    path: ['passwordConfirm'],
  });

export default function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    // @ts-expect-error defaultValues is not in the types
    defaultValues: { email },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    const { email: _email, password } = data;
    const email = _email.trim().toLowerCase();

    await dbUpdateUserPassword({ email, password });
    await sendUserActionInformationEmail(email, { type: 'reset-password-success' });

    router.push('/');
    toast.success('Password wurde erfolgreich zurückgesetzt');
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Your Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 block w-full p-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm`}
            readOnly
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`mt-1 block w-full p-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            {...register('passwordConfirm')}
            className={`mt-1 block w-full p-2 border ${
              errors.passwordConfirm ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm`}
          />
          {errors.passwordConfirm && (
            <p className="text-red-500 text-sm mt-1">{errors.passwordConfirm.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white font-semibold rounded-md ${
              isSubmitting ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      </form>
    </div>
  );
}
