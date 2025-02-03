'use client';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import { cw } from '@/utils/tailwind';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const qrFormSchema = z.object({
  text: z.string().min(1, 'Text is required'),
});

type FormValues = z.infer<typeof qrFormSchema>;

export default function QrGeneratorForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(qrFormSchema),
  });

  const { toast } = useToast();

  async function onSubmit(data: FormValues) {
    setIsLoading(true);

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
        toast({
          title: 'Error',
          description: result.error,
          type: 'foreground',
          variant: 'destructive',
        });

        return;
      }

      toast({
        title: 'Success',
        description: 'QR code generated successfully',
        type: 'background',
        action: <span>Try again</span>,
      });

      setQrCodeUrl(result.qrCodeUrl);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Error generating QR code',
        type: 'foreground',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spinner className="border-white h-20 w-20" />
            </div>
          ) : !qrCodeUrl ? (
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
            <Button
              type="button"
              onClick={() => {
                setQrCodeUrl(undefined);
              }}
            >
              Generate Another QR Code
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate QR Code'}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
