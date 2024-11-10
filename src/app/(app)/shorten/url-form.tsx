'use client';

import CopyToClipboardIcon from '@/components/icons/copy';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { env } from '@/env';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { shortenUrl } from './actions';

const urlFormSchema = z.object({
  url: z.string().url('Invalid URL'),
});

type FormValues = z.infer<typeof urlFormSchema>;

export default function ShortenUrlForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(urlFormSchema),
  });

  const [shortenedUrl, setShortenedUrl] = React.useState<string | undefined>(undefined);

  function handleCopy(value: string) {
    try {
      navigator.clipboard.writeText(value);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
      console.error('Error with copying:', error);
    }
  }

  function handleResetForm() {
    reset();
    setShortenedUrl(undefined);
  }

  async function onSubmit(data: FormValues) {
    try {
      const shortenedUrl = await shortenUrl(data.url);
      setShortenedUrl(`${env.NEXT_PUBLIC_baseUrl}/${shortenedUrl.shortPath}`);
      toast.success('URL shortened successfully');
    } catch (error) {
      toast.error('Failed to shorten URL');
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full max-w-2xl px-4">
      <Card className="w-full border-none rounded-full bg-gradient-to-r from-gray-700 to-indigo-900 p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white text-center text-2xl font-semibold mb-4">
            Shorten URL
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <CardContent>
            {shortenedUrl ? (
              <div className="flex items-center gap-3 mb-4">
                <Input
                  type="text"
                  value={shortenedUrl}
                  readOnly
                  className="w-full bg-gray-900 text-white border-none ring-0"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleCopy(shortenedUrl)}
                  className="text-gray-400 hover:text-gray-300 transition-colors group"
                >
                  <CopyToClipboardIcon className="h-5 w-5 group-hover:text-black" />
                </Button>
              </div>
            ) : (
              <div className="mb-4">
                <Label htmlFor="url" className="text-gray-300 mb-2 block">
                  Enter URL
                </Label>
                <Input
                  autoFocus
                  id="url"
                  type="text"
                  placeholder="https://example.com"
                  className={`w-full bg-gray-900 text-white ${
                    errors.url ? 'border-red-500' : 'border-gray-700'
                  }`}
                  {...register('url', {
                    required: 'URL is required',
                    pattern: { value: /^https?:\/\//, message: 'Enter a valid URL' },
                  })}
                />
                {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            {shortenedUrl ? (
              <Link href="/shorten">
                <Button onClick={handleResetForm}>Shorten another URL</Button>
              </Link>
            ) : (
              <Button type="submit">Shorten</Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
