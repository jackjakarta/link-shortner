import { env } from '@/env';
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const accessKeyId = env.awsAccessKeyId;
const secretAccessKey = env.awsSecretAccessKey;
const endpoint = env.awsS3EndpointUrl;
const region = env.awsRegion;
const bucketName = env.awsBucketName;
const bucketUrl = env.awsBucketUrl;

const s3 = new S3Client({
  forcePathStyle: true,
  region,
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function uploadImageToS3({
  fileName,
  fileBuffer,
}: {
  fileName: string;
  fileBuffer: ArrayBuffer;
}): Promise<string> {
  const uploadCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: Buffer.from(fileBuffer),
    ContentType: 'image/png',
  });

  await s3.send(uploadCommand);

  return `${bucketUrl}/${fileName}`;
}

export async function deleteFileFromS3({ key }: { key: string }) {
  const deleteParams: DeleteObjectCommandInput = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const command = new DeleteObjectCommand(deleteParams);
    await s3.send(command);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw error;
  }
}
