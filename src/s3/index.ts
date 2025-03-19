import { env } from '@/env';
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { type BucketName } from './types';

const accessKeyId = env.awsAccessKeyId;
const secretAccessKey = env.awsSecretAccessKey;
const endpoint = env.awsS3EndpointUrl;
const region = env.awsRegion;

const s3 = new S3Client({
  forcePathStyle: true,
  region,
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function uploadFileToS3({
  key,
  fileBuffer,
  bucketName = 'media',
  contentType = 'image/png',
}: {
  key: string;
  fileBuffer: ArrayBuffer;
  bucketName?: BucketName;
  contentType?: string;
}): Promise<string> {
  const uploadCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: Buffer.from(fileBuffer),
    ContentType: contentType,
  });

  const result = await s3.send(uploadCommand);

  if (result.$metadata.httpStatusCode !== 200) {
    throw new Error('Failed to upload file to S3');
  }

  return key;
}

export async function deleteFileFromS3({
  key,
  bucketName = 'media',
}: {
  key: string;
  bucketName?: BucketName;
}) {
  const deleteParams: DeleteObjectCommandInput = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const command = new DeleteObjectCommand(deleteParams);
    const result = await s3.send(command);

    if (result.$metadata.httpStatusCode !== 200) {
      throw new Error('Failed to upload file to S3');
    }
  } catch (error) {
    console.error('Error deleting file from S3:', { error });
    throw error;
  }
}

export async function getSignedUrlFromS3Get({
  key,
  bucketName = 'media',
  filename,
  contentType,
  attachment = true,
}: {
  key: string;
  bucketName?: BucketName;
  filename?: string;
  contentType?: string;
  attachment?: boolean;
}) {
  let contentDisposition = attachment ? 'attachment;' : '';
  if (filename !== undefined) {
    contentDisposition = `${contentDisposition} filename=${filename}`;
  }

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
    ...(contentDisposition !== '' ? { ResponseContentDisposition: contentDisposition } : {}),
    ...(contentType !== undefined ? { ResponseContentType: contentType } : {}),
  });

  try {
    // @ts-expect-error - weird typing issue with getSignedUrl s3 client type
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed GET URL for S3:', error);
    throw error;
  }
}
