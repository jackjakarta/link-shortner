'use server';

import { eq } from 'drizzle-orm';

import { db } from '..';
import { generateAndHashApiKey, hashApiKey, obscureApiKey } from '../crypto';
import { apiKeyTable, apiKeyUsageTable } from '../schema';

export async function dbCreateApiKey({
  apiKeyName,
  userId,
}: {
  apiKeyName: string;
  userId: string;
}) {
  const { apiKey, hashedApiKey } = await generateAndHashApiKey();

  await db.insert(apiKeyTable).values({
    userId,
    name: apiKeyName,
    apiKey: hashedApiKey,
    obscuredApiKey: obscureApiKey(apiKey),
  });

  return apiKey;
}

export async function dbFindApiKey({ apiKey }: { apiKey: string }) {
  const hashedApiKey = hashApiKey({ apiKey });
  try {
    const maybeApiKeyRow = (
      await db.select().from(apiKeyTable).where(eq(apiKeyTable.apiKey, hashedApiKey))
    )[0];

    return maybeApiKeyRow;
  } catch (error) {
    console.error(error);
  }
}

export async function dbGetApiKeyUsage({ apiKeyId }: { apiKeyId: string }) {
  const maybeApiKeyUsage = (
    await db.select().from(apiKeyUsageTable).where(eq(apiKeyUsageTable.apiKeyId, apiKeyId))
  )[0];

  return maybeApiKeyUsage;
}

export async function dbUpdateApiKeyUsage({ apiKeyId }: { apiKeyId: string }) {
  const currentUsage = await dbGetApiKeyUsage({ apiKeyId });

  if (currentUsage === undefined) {
    await db.insert(apiKeyUsageTable).values({
      apiKeyId,
      requestsCount: 1,
      lastUsedAt: new Date(),
    });
    return;
  }

  await db
    .update(apiKeyUsageTable)
    .set({
      requestsCount: currentUsage.requestsCount + 1,
      lastUsedAt: new Date(),
    })
    .where(eq(apiKeyUsageTable.apiKeyId, apiKeyId));
}
