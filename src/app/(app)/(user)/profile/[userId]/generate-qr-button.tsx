'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

type GenerateQrCodeButtonProps = {
  linkId: string;
  url: string;
  className?: React.ComponentProps<'button'>['className'];
};

export default function GenerateQrCodeButton({
  linkId,
  url,
  className,
}: GenerateQrCodeButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleGenerateQrCode() {
    setIsLoading(true);

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

      router.refresh();
      toast.success('QR Code generated!');
    } catch (error) {
      toast.error('Failed to generate QR Code');
      console.error('Error generating QR Code:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button className={className} onClick={handleGenerateQrCode} disabled={isLoading}>
      {isLoading ? 'Generating...' : 'Generate QR Code'}
    </button>
  );
}
