'use client';

import DialogWindow from '@/components/ui/dialog';
import Image from 'next/image';
import React from 'react';

type QrModalProps = {
  qrCodeUrl: string;
  buttonName?: string;
  buttonClassName?: React.ComponentProps<'button'>['className'];
};

export default function QrModal({ qrCodeUrl, buttonClassName, buttonName }: QrModalProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className={buttonClassName}>
        {buttonName ?? 'View'}
      </button>
      <DialogWindow
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="QR Code"
        description="Scan the QR code to open the link on your device."
      >
        <div className="flex justify-center">
          <Image width={500} height={500} src={qrCodeUrl} alt="QR Code" />
        </div>
      </DialogWindow>
    </>
  );
}
