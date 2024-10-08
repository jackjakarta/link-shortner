'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dbUpdateUserProfile } from '@/db/functions/profile';
import { type UserRow } from '@/db/schema';
import type { UserProfileRow } from '@/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

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
  user: UserRow;
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
      avatarUrl: profile.avatarUrl ?? undefined,
      location: profile.location ?? undefined,
      website: profile.website ?? undefined,
    },
  });

  async function onSubmit(data: FormData) {
    try {
      await dbUpdateUserProfile({
        userId: user.id,
        ...data,
      });
      toast.success('Profile updated successfully');
      // router.refresh();
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={user.name} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={user.email} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Input id="bio" {...register('bio')} placeholder="Bio" disabled={isSubmitting} />
        {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatarUrl">Avatar</Label>
        <Input
          id="avatarUrl"
          {...register('avatarUrl')}
          placeholder="Avatar"
          disabled={isSubmitting}
        />
        {errors.avatarUrl && <p className="text-red-500 text-sm">{errors.avatarUrl.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Bio</Label>
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}