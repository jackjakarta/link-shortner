'use client';

import { cw } from '@/utils/tailwind';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

type GenerateQrCodeButtonProps = {
  linkId: string;
  url: string;
  className?: React.ComponentProps<'button'>['className'];
  buttonName?: string;
};

export default function GenerateQrCodeButton({
  linkId,
  url,
  className,
  buttonName,
}: GenerateQrCodeButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleGenerateQrCode() {
    setIsLoading(true);
    toast.loading('Generating QR Code');

    try {
      const response = await fetch('/api/qr-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkId, url }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      toast.remove();
      toast.success('QR Code generated!');
    } catch (error) {
      toast.error('Failed to generate QR Code');
      console.error('Error generating QR Code:', error);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <button
      className={cw(className, 'disabled:cursor-not-allowed')}
      onClick={handleGenerateQrCode}
      disabled={isLoading}
    >
      {buttonName ?? 'Generate QR Code'}
    </button>
  );
}
