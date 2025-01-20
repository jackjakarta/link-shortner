'use client';

import { Button } from '@/components/ui/button';
import DialogWindow from '@/components/ui/dialog';
import { signOut } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';

import { deleteAccount } from './actions';

type DeleteAccountButtonProps = {
  text?: string;
  className?: React.ComponentProps<typeof Button>['className'];
};

export default function DeleteAccountButton({ className, text }: DeleteAccountButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  async function handleDeleteAccount() {
    toast.loading('Deleting account...');
    setIsLoading(true);

    try {
      await deleteAccount();
      toast.remove();
      toast.success('Account deleted successfully');
      signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error(error);
      toast.remove();
      toast.error('Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="destructive"
        className={className}
        onClick={() => setIsDialogOpen(true)}
        disabled={isLoading}
      >
        {text ?? 'Delete account'}
      </Button>

      <DialogWindow
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Are you sure ?"
        description="This action is not reversible"
      >
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="font-medium hover:underline"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </button>
          <Button
            type="button"
            onClick={handleDeleteAccount}
            variant="destructive"
            size="default"
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      </DialogWindow>
    </>
  );
}
