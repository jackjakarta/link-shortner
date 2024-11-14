'use client';

import { sendUserActionEmail } from '@/email/send';
import toast from 'react-hot-toast';

type ResendVerificationButtonProps = {
  userEmail: string;
  className?: React.ComponentProps<'button'>['className'];
};

export default function ResendVerificationButton({
  userEmail,
  className,
}: ResendVerificationButtonProps) {
  async function resendVerification() {
    toast.loading('Resending email');

    try {
      await sendUserActionEmail({ to: userEmail, action: 'verify-email' });
      toast.remove();
      toast.success('Email sent');
    } catch (error) {
      toast.remove();
      toast.error('Failed to resend email');
      console.error(error);
    }
  }

  return (
    <button onClick={resendVerification} className={className}>
      Resend
    </button>
  );
}
