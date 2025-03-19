import { dbGetLinkById, dbUpdateLinkQrCodeS3Key } from '@/db/functions/link';
import { uploadFileToS3 } from '@/s3';
import { getUser } from '@/utils/auth';
import { bufferToArrayBuffer } from '@/utils/files';
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
  const user = await getUser();

  try {
    const body = await req.json();
    const parsed = urlRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const link = await dbGetLinkById({ linkId: parsed.data.linkId, userId: user.id });

    if (link === undefined) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    const s3Key = `${user.name}/qr-codes/qrcode-${nanoid(12)}.png`;
    const qrCodeBuffer = await QRCode.toBuffer(parsed.data.url, { type: 'png', width: 500 });

    const qrCodeS3Key = await uploadFileToS3({
      key: s3Key,
      fileBuffer: bufferToArrayBuffer(qrCodeBuffer),
    });

    await dbUpdateLinkQrCodeS3Key({ linkId: link.id, qrCodeS3Key });

    return NextResponse.json({ message: 'QR Code saved.' }, { status: 201 });
  } catch (error) {
    console.error('Error uploading QR code:', error);
    return NextResponse.json({ error: 'Failed to upload QR code' }, { status: 500 });
  }
}
