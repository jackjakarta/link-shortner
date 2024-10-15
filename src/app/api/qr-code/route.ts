import { dbGetLinkById, dbUpdateLinkQrCodeUrl } from '@/db/functions/link';
import { uploadImageToS3 } from '@/s3';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { z } from 'zod';

const urlRequestSchema = z.object({
  linkId: z.string().min(1, 'Link ID is required'),
  url: z.string().url('Invalid URL'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = urlRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const link = await dbGetLinkById({ linkId: parsed.data.linkId });

    if (link === undefined) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    const qrCodeBuffer = await QRCode.toBuffer(parsed.data.url, { type: 'png', width: 500 });

    const fileName = `qr-codes/qrcode-${nanoid(12)}.png`;
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
