'use client';

import CopyToClipboardIcon from '@/components/icons/copy';
import { env } from '@/env';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { shortenUrl } from './actions';

const urlFormSchema = z.object({
  url: z.string().url(),
});

type FormValues = z.infer<typeof urlFormSchema>;

export default function ShortenUrlForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  async function onSubmit(data: FormValues) {
    try {
      const shortenedUrl = await shortenUrl(data.url);

      if (shortenedUrl === undefined) {
        throw new Error('Failed to shorten URL');
      }

      setShortenedUrl(`${env.NEXT_PUBLIC_baseUrl}/${shortenedUrl.shortPath}`);
      toast.success('URL shortened successfully');
    } catch (error) {
      toast.error('Failed to shorten URL');
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Shorten URL</h1>

        {shortenedUrl ? (
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={shortenedUrl}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => handleCopy(shortenedUrl)}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CopyToClipboardIcon />
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <label htmlFor="url" className="block text-gray-600 mb-2">
              Enter URL
            </label>
            <input
              id="url"
              type="text"
              className={`w-full px-4 py-2 border ${errors.url ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="https://example.com"
              {...register('url', { required: 'URL is required' })}
            />
            {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors"
        >
          {shortenedUrl ? 'Shorten Another URL' : 'Shorten'}
        </button>
      </form>
    </div>
  );
}
