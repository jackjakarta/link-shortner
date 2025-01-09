import { and, desc, eq, ne } from 'drizzle-orm';

import { db } from '..';
import { generateAndHashApiKey, hashApiKey, obscureApiKey } from '../crypto';
import { apiKeyTable, apiKeyUsageTable, type ApiKeyRow, type ApiKeyStatus } from '../schema';

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

export async function dbGetApiKeysByUserId({ userId }: { userId: string }): Promise<ApiKeyRow[]> {
  const apiKeys = await db
    .select()
    .from(apiKeyTable)
    .where(and(eq(apiKeyTable.userId, userId), ne(apiKeyTable.status, 'revoked')))
    .orderBy(desc(apiKeyTable.createdAt));

  return apiKeys;
}

export async function dbSetApiKeyStatus({
  apiKeyId,
  status,
  userId,
}: {
  apiKeyId: string;
  status: ApiKeyStatus;
  userId: string;
}) {
  await db
    .update(apiKeyTable)
    .set({ status })
    .where(and(eq(apiKeyTable.id, apiKeyId), eq(apiKeyTable.userId, userId)));
}

export async function dbGetApiKeysUsageByUserId({ userId }: { userId: string }) {
  const apiKeys = await dbGetApiKeysByUserId({ userId });

  const apiKeysUsage = await Promise.all(
    apiKeys.map(async (apiKey) => {
      const usage = await dbGetApiKeyUsage({ apiKeyId: apiKey.id });
      return {
        ...apiKey,
        usage,
      };
    }),
  );

  return apiKeysUsage;
}
