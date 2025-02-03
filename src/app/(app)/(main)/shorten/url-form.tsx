'use client';

import { useToast } from '@/components/hooks/use-toast';
import CopyToClipboardIcon from '@/components/icons/copy';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import { env } from '@/env';
import { urlSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { shortenUrl } from './actions';

const urlFormSchema = z.object({
  url: urlSchema,
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

  const { toast } = useToast();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const [shortenedUrl, setShortenedUrl] = React.useState<string | undefined>(undefined);

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }

  function handleResetForm() {
    reset();
    setShortenedUrl(undefined);
  }

  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    try {
      const shortenedUrl = await shortenUrl({ url: data.url });
      setShortenedUrl(`${env.NEXT_PUBLIC_baseUrl}/${shortenedUrl.shortPath}`);

      toast({
        title: 'Success',
        description: 'Link generated successfully',
        type: 'background',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Error while generating the short link code',
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
          Shorten URL
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spinner className="border-white h-20 w-20" />
            </div>
          ) : shortenedUrl ? (
            <div className="flex items-center gap-3 mb-4">
              <Input
                type="text"
                value={shortenedUrl}
                readOnly
                className="w-full bg-gray-900 text-white border-none ring-0"
              />
              {isCopied ? (
                <Button
                  disabled
                  type="button"
                  variant="ghost"
                  className="text-gray-400 hover:text-gray-300 transition-colors group"
                >
                  <Check className="h-5 w-5 group-hover:text-black" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleCopy(shortenedUrl)}
                  className="text-gray-400 hover:text-gray-300 transition-colors group"
                >
                  <CopyToClipboardIcon className="h-5 w-5 group-hover:text-black" />
                </Button>
              )}
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
                {...register('url')}
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Shorten'}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
