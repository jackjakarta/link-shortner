'use client';

import CopyToClipboardIcon from '@/components/icons/copy';
import CrossIcon from '@/components/icons/cross';
import { Button } from '@/components/ui/button';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

import { createApiKey } from './actions';

const inputClassName =
  'w-full p-2 border border-main-300 rounded-md focus:outline-none focus:border-main-500';

export default function CreateApiKeyButton() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [apiKeyName, setApiKeyName] = React.useState('');
  const [plainApiKey, setPlainApiKey] = React.useState<string | null>(null);

  async function handleApiKeyCreation() {
    const apiKey = await createApiKey({ apiKeyName });

    if (apiKey === undefined) {
      console.error('Something went wrong while creating the API key');
      return;
    }

    setPlainApiKey(apiKey);
    router.refresh();
  }

  function handleApiKeySaveConfirm() {
    setPlainApiKey(null);
    setIsDialogOpen(false);
  }

  return (
    <div>
      <Button onClick={() => setIsDialogOpen(true)}>Generate API key</Button>
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Portal>
          <Dialog.Content className="fixed top-1/2 left-1/2 w-[120vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-md">
            {plainApiKey === null ? (
              <div>
                <Dialog.Title className="text-2xl font-medium mb-4">
                  Generate a new API key
                </Dialog.Title>
                <Dialog.Description className="text-main-600">
                  API keys are used to authenticate your requests to the API. They are unique to you
                  and should be kept secret.
                </Dialog.Description>
                <label className="block text-base text-main-900 pb-2 pt-4">Name</label>
                <input
                  className={inputClassName}
                  value={apiKeyName}
                  onChange={(e) => setApiKeyName(e.target.value)}
                />
                <div className="flex justify-between pt-8">
                  <Dialog.Close asChild>
                    <button className="font-medium text-sm hover:underline">Cancel</button>
                  </Dialog.Close>
                  <Button size="sm" onClick={handleApiKeyCreation}>
                    Create
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Dialog.Title className="font-medium text-2xl text-main-900 mb-4">
                  API Key generated
                </Dialog.Title>
                <p>
                  Your API key has been generated. Please copy it and store it securely. You won't
                  be able to see it again.
                </p>
                <div className="flex gap-2 mt-6">
                  <input className={inputClassName} value={plainApiKey} readOnly />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(plainApiKey);
                      toast.success('API-Schlüssel in die Zwischenablage kopiert');
                    }}
                    className="flex items-center hover:text-gray-500 gap-1.5"
                  >
                    <CopyToClipboardIcon />
                    <span className="text-sm">Copy</span>
                  </button>
                </div>
                <div className="flex">
                  <div className="flex-grow" />
                  <Button size="sm" className="mt-4" onClick={handleApiKeySaveConfirm}>
                    Done
                  </Button>
                </div>
              </div>
            )}
            <Dialog.Close asChild>
              <button className="absolute top-2 right-2 font-semibold">
                <CrossIcon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
