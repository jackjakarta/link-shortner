import LinkIcon from '@/components/icons/link';
import { type ShortLinkRow } from '@/db/schema';
import { env } from '@/env';
import { formatDateToDayMonthYearTime } from '@/utils/date';
import { format, isToday, isYesterday } from 'date-fns';
import Link from 'next/link';

type LinksTableProps = {
  links: ShortLinkRow[];
};

export default function LinksTable({ links }: LinksTableProps) {
  const baseUrl = env.NEXT_PUBLIC_baseUrl;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Short Link
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
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap">
                <Link
                  className="hover:text-gray-500"
                  href={`${baseUrl}/${link.shortPath}`}
                  target="_blank"
                >
                  <div className="flex items-center gap-2">
                    {baseUrl}/{link.shortPath}
                    <LinkIcon />
                  </div>
                </Link>
              </th>
              <td className="px-6 py-4 truncate">
                <Link className="hover:text-gray-500" href={link.longUrl} target="_blank">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}