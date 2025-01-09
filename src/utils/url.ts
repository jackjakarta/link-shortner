import { env } from '@/env';

export function buildRouteUrl({ route }: { route: string }) {
  return `${env.NEXT_PUBLIC_baseUrl}/${route}`;
}

export function buildUserActionUrl({ searchParams }: { searchParams: URLSearchParams }) {
  const routeUrl = buildRouteUrl({ route: 'user-action' });
  const userActionUrl = `${routeUrl}?${searchParams.toString()}`;

  return userActionUrl;
}

export function extractFileNameFromUrl(url: string | null): string | null {
  if (url === null) {
    return null;
  }

  const match = url.match(/[^/]+$/);

  return match ? match[0] : null;
}
