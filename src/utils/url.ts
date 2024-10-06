import { env } from '@/env';

export function buildRouteUrl({ route }: { route: string }) {
  const url = `${env.NEXT_PUBLIC_baseUrl}/${route}`;

  return url;
}
