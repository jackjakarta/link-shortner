'use client';

import CopyToClipboardIcon from '@/components/icons/copy';
import LinkIcon from '@/components/icons/link';
import Refresh from '@/components/refresh';
import { Button } from '@/components/ui/button';
import { type ShortLinkRow } from '@/db/schema';
import { formatDateToDayMonthYearTime } from '@/utils/date';
import { buildRouteUrl } from '@/utils/url';
import { format, isToday, isYesterday } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import DeleteLinkButton from './delete-link-button';
import GenerateQrCodeButton from './generate-qr-button';
import QrModal from './qr-modal';

type LinksTableProps = {
  links: ShortLinkRow[];
};

export default function LinksTable({ links }: LinksTableProps) {
  const router = useRouter();

  function handleCopyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  }

  return (
    <>
      <Refresh />
      {links.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Short Link
                </th>
                <th scope="col" className="px-6 py-3">
                  Copy
                </th>
                <th scope="col" className="px-6 py-3">
                  Original Url
                </th>
                <th scope="col" className="px-6 py-3">
                  Clicks
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Clicked On
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  QR Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap">
                    <Link
                      className="hover:text-gray-500"
                      href={buildRouteUrl({ route: link.shortPath })}
                      target="_blank"
                    >
                      <div className="flex items-center gap-2">
                        {buildRouteUrl({ route: link.shortPath })}
                        <LinkIcon />
                      </div>
                    </Link>
                  </th>
                  <td className="px-6 py-4 truncate">
                    <div>
                      <button
                        onClick={() =>
                          handleCopyToClipboard(buildRouteUrl({ route: link.shortPath }))
                        }
                        className="flex items-center gap-2 hover:text-gray-900 cursor-pointer"
                      >
                        <CopyToClipboardIcon />
                        Copy
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 truncate">
                    <Link className="hover:text-gray-900" href={link.longUrl} target="_blank">
                      <div className="flex items-center gap-2">
                        {link.longUrl}
                        <LinkIcon />
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">{link.clickCount}</td>
                  <td className="px-6 py-4">
                    {link.lastClickedAt
                      ? isToday(new Date(link.lastClickedAt))
                        ? `Today at ${format(new Date(link.lastClickedAt), 'HH:mm')}`
                        : isYesterday(new Date(link.lastClickedAt))
                          ? `Yesterday at ${format(new Date(link.lastClickedAt), 'HH:mm')}`
                          : formatDateToDayMonthYearTime(link.lastClickedAt)
                      : 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    {isToday(new Date(link.createdAt))
                      ? `Today at ${format(new Date(link.createdAt), 'HH:mm')}`
                      : isYesterday(new Date(link.createdAt))
                        ? `Yesterday at ${format(new Date(link.createdAt), 'HH:mm')}`
                        : formatDateToDayMonthYearTime(link.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    {link.qrCodeS3Key ? (
                      <QrModal
                        buttonClassName="hover:text-gray-900"
                        qrCodeS3Key={link.qrCodeS3Key}
                      />
                    ) : (
                      <GenerateQrCodeButton
                        className="hover:text-gray-900"
                        linkId={link.id}
                        url={buildRouteUrl({ route: link.shortPath })}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <DeleteLinkButton linkId={link.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center pt-[20rem] text-gray-500 dark:text-gray-400">
          <span className="text-xl">No links found</span>
          <Button onClick={() => router.push('/shorten')}>Generate link</Button>
        </div>
      )}
    </>
  );
}
