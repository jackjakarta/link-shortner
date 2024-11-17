'use client';

import { Button } from '@/components/ui/button';
import DialogWindow from '@/components/ui/dialog';
import { type ApiKeyStatus } from '@/db/schema';
import { cw } from '@/utils/tailwind';
import React from 'react';

export default function DeleteKeyButton({
  apiKeyId,
  handleStatusChange,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}: {
  apiKeyId: string;
  handleStatusChange: (apiKeyId: string, status: ApiKeyStatus) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (value: boolean) => void;
}) {
  return (
    <>
      <button
        className={cw(
          'relative flex select-none cursor-pointer w-full hover:bg-gray-100 items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        )}
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        Delete
      </button>
      <DialogWindow
        title="Delete API Key"
        description="Are you sure you want to delete this API key? This action cannot be undone."
        open={isDeleteDialogOpen}
        onOpenChange={() => setIsDeleteDialogOpen(!isDeleteDialogOpen)}
      >
        <div className="flex justify-between mt-4">
          <button
            className="font-medium text-sm hover:underline"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancel
          </button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            size="sm"
            onClick={async () => {
              handleStatusChange(apiKeyId, 'revoked');
              setIsDeleteDialogOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </DialogWindow>
    </>
  );
}
