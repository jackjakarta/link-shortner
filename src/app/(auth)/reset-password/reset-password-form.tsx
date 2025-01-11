'use client';

import { useFormTools } from '@/components/hooks/use-form-tools';
import EyeClosedIcon from '@/components/icons/eye-closed';
import EyeOpenIcon from '@/components/icons/eye-open';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dbDeleteActionToken } from '@/db/functions/token';
import { type TokenRow } from '@/db/schema';
import { sendUserActionInformationEmail } from '@/email/send';
import { emailSchema, passwordSchema } from '@/utils/schemas';
import { cw } from '@/utils/tailwind';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { updateUserPassword } from './actions';

type ResetPasswordFormProps = TokenRow;

const resetPasswordSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'The passwords do not match',
    path: ['passwordConfirm'],
  });

export default function ResetPasswordForm({ email, token }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: email ?? undefined },
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

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    try {
      const { email: _email, password } = data;
      const email = _email.trim().toLowerCase();

      await updateUserPassword({ email, password });
      await sendUserActionInformationEmail(email, { type: 'reset-password-success' });

      router.push('/login');
      toast.success('Password reset successfully');
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Failed to reset password:', error);
    } finally {
      await dbDeleteActionToken({ token });
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
          readOnly
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Enter your new password"
          {...register('password')}
          onChange={(e) => evaluatePasswordStrength(e.target.value)}
          className={errors.password ? 'border-red-500' : 'border border-input'}
        />
        <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-9">
          {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </button>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
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

      <div className="space-y-2">
        <Label htmlFor="passwordConfirm">Confirm Password</Label>
        <Input
          id="passwordConfirm"
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          placeholder="Confirm your new password"
          {...register('passwordConfirm')}
          className={errors.passwordConfirm ? 'border-red-500' : 'border border-input'}
        />
        <button
          type="button"
          onClick={toggleConfirmPasswordVisibility}
          className="absolute right-3 top-9"
        >
          {isConfirmPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </button>
        {errors.passwordConfirm && (
          <p className="text-red-500 text-sm mt-1">{errors.passwordConfirm.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  );
}
