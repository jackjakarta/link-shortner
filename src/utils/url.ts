import { env } from '@/env';

export function buildRouteUrl({ route }: { route: string }) {
  return `${env.NEXT_PUBLIC_baseUrl}/${route}`;
}
