import { moderateText } from '@/openai/moderation';
import { getSignedUrlFromS3Get, uploadFileToS3 } from '@/s3';
import { bufferToArrayBuffer } from '@/utils/files';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { z } from 'zod';

const requestSchema = z.object({
  text: z.string().min(1, 'Text is required'),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const body = requestSchema.safeParse(json);

    if (!body.success) {
      return NextResponse.json({ error: body.error.errors }, { status: 400 });
    }

    const isFlagged = await moderateText({ content: body.data.text });

    if (isFlagged) {
      return NextResponse.json(
        { error: 'Your content was flagged by our moderation system.' },
        { status: 418 },
      );
    }

    const fileId = nanoid(12);
    const s3Key = `generated-qr-codes/${fileId}.png`;
    const qrCodeBuffer = await QRCode.toBuffer(body.data.text, { type: 'png', width: 500 });

    await uploadFileToS3({
      key: s3Key,
      fileBuffer: bufferToArrayBuffer(qrCodeBuffer),
    });

    const signedUrl = await getSignedUrlFromS3Get({ key: s3Key });

    return NextResponse.json({ signedUrl }, { status: 201 });
  } catch (error) {
    console.error('Error uploading QR code:', error);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}
