'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { emailSchema } from '@/utils/schemas';
import { cw } from '@/utils/tailwind';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  message: z.string().min(1, 'Message is required'),
});

type FormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: FormValues) {
    toast.loading('Submitting your message...');

    try {
      // TODO: Send the message to the server
      console.log({ data });
      toast.remove();
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.remove();
      toast.error('Failed to send message');
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center  w-full max-w-2xl px-4">
      <Card className="w-full border-none rounded-lg bg-gradient-to-r from-gray-700 to-indigo-900 p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white text-center text-2xl font-semibold mb-4">
            Contact Us
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="name" className="text-gray-300 mb-2 block">
                Name
              </Label>
              <Input
                autoFocus
                id="name"
                type="text"
                placeholder="Enter your name"
                className={cw(
                  'w-full bg-gray-900 text-white',
                  errors.name ? 'border-red-500' : 'border-gray-700',
                )}
                {...register('name')}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <Label htmlFor="email" className="text-gray-300 mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={cw(
                  'w-full bg-gray-900 text-white',
                  errors.email ? 'border-red-500' : 'border-gray-700',
                )}
                {...register('email')}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <Label htmlFor="message" className="text-gray-300 mb-2 block">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                className={cw(
                  'w-full bg-gray-900 text-white',
                  errors.message ? 'border-red-500' : 'border-gray-700',
                )}
                {...register('message')}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
