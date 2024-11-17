import { dbGetLinksByUserId } from '@/db/functions/link';
import { buildRouteUrl } from '@/utils/url';
import { NextRequest, NextResponse } from 'next/server';

import { checkApiKey } from '../utils';

export async function GET(req: NextRequest) {
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

    const links = await dbGetLinksByUserId({ userId: maybeApiKeyInfo.userId });

    if (links.length === 0) {
      return NextResponse.json({ message: 'No Links for this user' }, { status: 200 });
    }

    const linksWithShortUrl = links.map((link) => {
      return {
        shortUrl: buildRouteUrl({ route: link.shortPath }),
        longUrl: link.longUrl,
        clickCount: link.clickCount,
        lastClickedAt: link.lastClickedAt,
        qrCodeUrl: link.qrCodeUrl,
        createdAt: link.createdAt,
      };
    });

    return NextResponse.json(linksWithShortUrl, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
