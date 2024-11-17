'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type ApiKeyRow, type ApiKeyStatus } from '@/db/schema';
import { formatDateToDayMonthYearTime } from '@/utils/date';
import { capitalizeFirstLetter } from '@/utils/format';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

import { setApiKEyStatus } from './actions';
import DeleteKeyButton from './delete-key-button';

export default function ApiKeysTable({ apiKeys }: { apiKeys: ApiKeyRow[] }) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  async function handleStatusChange(apiKeyId: string, status: ApiKeyStatus) {
    const toastLoadingMessage = status === 'revoked' ? 'Deleting API key' : 'Updating API key';
    const toastSuccesMessage =
      status === 'revoked' ? 'Api key deleted' : `Api key set to ${status}`;

    toast.loading(toastLoadingMessage);

    try {
      await setApiKEyStatus({ apiKeyId, status });
      toast.remove();
      toast.success(toastSuccesMessage);
    } catch (error) {
      toast.remove();
      toast.error('Failed to update API key status.');
      console.error(error);
    } finally {
      router.refresh();
    }
  }

  if (apiKeys.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold mb-4">API Keys</h2>
        <p>No API keys found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">API Keys</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>API Key</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((apiKey) => (
            <TableRow key={apiKey.id}>
              <TableCell className="font-medium">{apiKey.name}</TableCell>
              <TableCell>{apiKey.obscuredApiKey}</TableCell>
              <TableCell>{capitalizeFirstLetter({ word: apiKey.status })}</TableCell>
              <TableCell>{formatDateToDayMonthYearTime(apiKey.createdAt)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="default" className="focus:outline-none border-none" size="sm">
                      Edit
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={async () =>
                        handleStatusChange(
                          apiKey.id,
                          apiKey.status === 'active' ? 'inactive' : 'active',
                        )
                      }
                    >
                      {apiKey.status === 'active' ? 'Deactivate' : 'Activate'}
                    </DropdownMenuItem>
                    <DeleteKeyButton
                      isDeleteDialogOpen={isDeleteDialogOpen}
                      setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                      apiKeyId={apiKey.id}
                      handleStatusChange={handleStatusChange}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
