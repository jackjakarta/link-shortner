'use client';

import { sendVerifyEmail } from '@/app/(auth)/actions';
import toast from 'react-hot-toast';

type ResendVerificationButtonProps = {
  userEmail: string;
  className?: React.ComponentProps<'button'>['className'];
};

export default function ResendVerificationButton({
  userEmail,
  className,
}: ResendVerificationButtonProps) {
  async function handleResendVerification() {
    toast.loading('Resending email');

    try {
      await sendVerifyEmail({ email: userEmail });
      toast.remove();
      toast.success('Email sent');
    } catch (error) {
      console.error(error);
      toast.remove();
      toast.error('Failed to resend email');
    }
  }

  return (
    <button onClick={handleResendVerification} className={className}>
      Resend
    </button>
  );
}
