import { dbCreateLink } from '@/db/functions/link';
import { urlSchema } from '@/utils/schemas';
import { buildRouteUrl } from '@/utils/url';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { checkApiKey } from '../utils';

const linkRequestSchema = z.object({
  url: urlSchema,
});

export async function POST(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get('authorization');

    const [maybeCheckApiKeyError, maybeApiKeyInfo] = await checkApiKey({
      authorizationHeader,
    });

    if (maybeCheckApiKeyError !== null) {
      return NextResponse.json(
        { code: maybeCheckApiKeyError.code, error: maybeCheckApiKeyError.error },
        { status: maybeCheckApiKeyError.code },
      );
    }

    const json = await req.json();
    const body = linkRequestSchema.safeParse(json);

    if (!body.success) {
      return NextResponse.json({ error: body.error.errors }, { status: 400 });
    }

    const newLink = await dbCreateLink({
      shortPath: nanoid(4),
      longUrl: body.data.url,
      userId: maybeApiKeyInfo.userId,
    });

    if (newLink === undefined) {
      return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
    }

    const shortUrl = buildRouteUrl({ route: newLink.shortPath });

    return NextResponse.json(
      {
        shortUrl,
        longUrl: newLink.longUrl,
        clickCount: newLink.clickCount,
        lastClickedAt: newLink.lastClickedAt,
        qrCodeUrl: newLink.qrCodeUrl,
        createdAt: newLink.createdAt,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
