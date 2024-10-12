'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { UserProfileRow } from '@/db/schema';
import { sleep } from '@/utils/sleep';
import { type ObscuredUser } from '@/utils/user';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { updateProfile } from './actions';

const schema = z.object({
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function UserProfileSettingsForm({
  user,
  profile,
}: {
  user: ObscuredUser;
  profile: UserProfileRow;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: profile.bio ?? undefined,
      location: profile.location ?? undefined,
      website: profile.website ?? undefined,
    },
  });

  async function onSubmit(data: FormData) {
    toast.loading('Saving...');

    try {
      await updateProfile({
        userId: user.id,
        ...data,
      });
      await sleep(500);
      toast.remove();
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
      <div className="space-y-2">
        <Label htmlFor="name">Username</Label>
        <Input id="name" className="cursor-not-allowed bg-gray-100" value={user.name} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" className="cursor-not-allowed bg-gray-100" value={user.email} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          rows={4}
          id="bio"
          {...register('bio')}
          placeholder="Bio"
          disabled={isSubmitting}
        />
        {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" {...register('location')} placeholder="Bio" disabled={isSubmitting} />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="Website">Website</Label>
        <Input
          id="website"
          {...register('website')}
          placeholder="Website"
          disabled={isSubmitting}
        />
        {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
      </div>

      <Button
        className="disabled:bg-gray-700 disabled:cursor-not-allowed"
        type="submit"
        disabled={isSubmitting}
      >
        Save Changes
      </Button>
    </form>
  );
}
