'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cw } from '@/utils/tailwind';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
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

  return (
    <Card className="w-full max-w-2xl border-none rounded-full bg-gradient-to-r from-gray-700 to-indigo-900 p-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white text-center text-2xl font-semibold mb-4">
          QR Code Generator
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <CardContent>
          {!qrCodeUrl ? (
            <div className="mb-4">
              <Label htmlFor="text" className="text-gray-300 mb-2 block">
                Enter Text
              </Label>
              <Input
                autoFocus
                id="text"
                type="text"
                placeholder="Enter the text for QR code"
                className={cw(
                  'w-full bg-gray-900 text-white',
                  errors.text ? 'border-red-500' : 'border-gray-700',
                )}
                {...register('text')}
              />
              {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 mb-4">
              <Image src={qrCodeUrl} width={300} height={300} alt="Generated QR Code" />
              <Link
                href={qrCodeUrl}
                className="text-gray-400 hover:text-gray-300 transition-colors group"
              >
                Download
              </Link>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          {qrCodeUrl ? (
            <Link
              className={cw(
                'h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                'bg-primary text-primary-foreground hover:bg-primary/80 disabled:bg-gray-700 disabled:cursor-not-allowed',
              )}
              href=""
              onClick={() => window.location.reload()}
            >
              Generate Another QR Code
            </Link>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Generating...' : 'Generate QR Code'}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
