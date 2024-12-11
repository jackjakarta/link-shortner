import { dbGetLinkById, dbUpdateLinkQrCodeUrl } from '@/db/functions/link';
import { uploadImageToS3 } from '@/s3';
import { getValidSession } from '@/utils/auth';
import { urlSchema } from '@/utils/schemas';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { z } from 'zod';

const urlRequestSchema = z.object({
  linkId: z.string().uuid('Invalid link ID'),
  url: urlSchema,
});

export async function POST(req: NextRequest) {
  await getValidSession();

  try {
    const body = await req.json();
    const parsed = urlRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const link = await dbGetLinkById({ linkId: parsed.data.linkId });

    if (link === undefined) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    const fileName = `qr-codes/qrcode-${nanoid(12)}.png`;
    const qrCodeBuffer = await QRCode.toBuffer(parsed.data.url, { type: 'png', width: 500 });

    const qrCodeUrl = await uploadImageToS3({
      fileName,
      fileBuffer: qrCodeBuffer,
    });

    await dbUpdateLinkQrCodeUrl({ linkId: link.id, qrCodeUrl });

    return NextResponse.json({ message: 'QR Code saved.' }, { status: 201 });
  } catch (error) {
    console.error('Error uploading QR code:', error);
    return NextResponse.json({ error: 'Failed to upload QR code' }, { status: 500 });
  }
}
