'use client';

import DialogWindow from '@/components/ui/dialog';
import Image from 'next/image';
import React from 'react';

import { getS3SignedUrlAction } from './actions';

type QrModalProps = {
  qrCodeS3Key: string;
  buttonName?: string;
  buttonClassName?: React.ComponentProps<'button'>['className'];
};

export default function QrModal({ qrCodeS3Key, buttonClassName, buttonName }: QrModalProps) {
  const key = qrCodeS3Key;
  console.log({ key });
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  async function handleGetSignedUrl() {
    try {
      const signedUrl = await getS3SignedUrlAction({ key });
      setImageUrl(signedUrl);
    } catch (error) {
      console.error(error);
      setImageUrl(null);
    }
  }

  async function handleOpenModal() {
    setIsModalOpen(true);
    await handleGetSignedUrl();
  }

  return (
    <>
      <button onClick={handleOpenModal} className={buttonClassName}>
        {buttonName ?? 'View'}
      </button>
      <DialogWindow
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="QR Code"
        description="Scan the QR code to open the link on your device."
      >
        <div className="flex justify-center">
          <Image width={500} height={500} src={imageUrl ?? ''} alt="QR Code" />
        </div>
      </DialogWindow>
    </>
  );
}
