'use client';

import TrashIcon from '@/components/icons/trash';
import { Button } from '@/components/ui/button';
import DialogWindow from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

import { deleteLink } from './actions';

export default function DeleteLinkButton({ linkId }: { linkId: string }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleDelete() {
    setIsLoading(true);
    toast.loading('Deleting link...');

    try {
      await deleteLink({ linkId });
      toast.remove();
      toast.success('Link deleted');
    } catch (error) {
      console.error(error);
      toast.remove();
      toast.error('Failed to delete link');
    } finally {
      router.refresh();
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  }

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} variant="destructive" size="padOne">
        <TrashIcon className="w-5 h-5" />
      </Button>
      <DialogWindow
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Are you sure ?"
        description="This action is not reversible"
      >
        <div className="flex justify-between items-center">
          <button className="font-semibold hover:underline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </button>
          <Button onClick={handleDelete} variant="destructive" size="default" disabled={isLoading}>
            Delete
          </Button>
        </div>
      </DialogWindow>
    </>
  );
}
