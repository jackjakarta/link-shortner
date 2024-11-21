'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const qrFormSchema = z.object({
  text: z.string().min(1, 'Text is required'),
});

type FormValues = z.infer<typeof qrFormSchema>;

export default function QrGeneratorForm() {
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(qrFormSchema),
  });

  async function onSubmit(data: FormValues) {
    toast.loading('Generating QR code...');

    try {
      const response = await fetch('/api/qr-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 418) {
        toast.remove();
        toast.error(result.error);
        return;
      }

      setQrCodeUrl(result.qrCodeUrl);
      toast.remove();
      toast.success('QR code generated successfully');
    } catch (error) {
      toast.remove();
      toast.error('Failed to generate QR code');
      console.error(error);
    }
  }

  function handleCopy(value: string) {
    try {
      navigator.clipboard.writeText(value);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
      console.error('Error with copying:', error);
    }
  }

  return (
    <>
      {!qrCodeUrl ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="text" className="text-sm font-medium text-gray-700">
              Text
            </label>
            <input
              type="text"
              id="text"
              {...register('text')}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.text && <p className="text-red-500">{errors.text.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-black"
          >
            {isSubmitting ? 'Generating...' : 'Generate QR Code'}
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <Image src={qrCodeUrl} width={200} height={200} alt="Generated QR Code" />
          <button
            onClick={() => handleCopy(qrCodeUrl)}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Copy QR Code
          </button>
          <button
            onClick={() => window.location.reload()}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Generate Another QR Code
          </button>
        </div>
      )}
    </>
  );
}
