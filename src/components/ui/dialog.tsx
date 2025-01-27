'use client';

import { cw } from '@/utils/tailwind';
import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

import CrossIcon from '../icons/cross';

type DialogProps = {
  open: boolean;
  onOpenChange(b: boolean): void;
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function DialogWindow({
  open,
  onOpenChange,
  children,
  title,
  description,
}: DialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content
          className={cw(
            'motion-scale-in-[0.5] motion-translate-x-in-[-25%] motion-translate-y-in-[25%] motion-opacity-in-[0%]',
            'motion-rotate-in-[-10deg] motion-blur-in-[5px] motion-duration-[0.53s]/scale motion-duration-[0.29s]/translate',
            'motion-duration-[0.13s]/opacity motion-duration-[0.70s]/rotate motion-duration-[0.24s]/blur motion-delay-[0.11s]/blur',
            'fixed top-1/2 left-1/2 w-[90vw] max-w-md rounded-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6',
          )}
        >
          <Dialog.Title className="text-2xl font-medium">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 mb-4 text-base text-gray-500">
            {description}
          </Dialog.Description>
          {children}
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 font-semibold group hover:text-gray-500">
              <CrossIcon className="group-hover:text-gray-500" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
