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
  const [buttonText, setButtonText] = React.useState('Generate QR Code');

  async function handleGenerateQrCode() {
    setIsLoading(true);
    setButtonText('Generating...');

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

      toast.success('QR Code generated!');
    } catch (error) {
      setButtonText('Generate QR Code');
      toast.error('Failed to generate QR Code');
      console.error('Error generating QR Code:', error);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <button className={className} onClick={handleGenerateQrCode} disabled={isLoading}>
      {buttonText}
    </button>
  );
}
