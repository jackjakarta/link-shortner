import { dbFindApiKey, dbUpdateApiKeyUsage } from '@/db/functions/api-key';
import { type ApiKeyRow } from '@/db/schema';

export async function checkApiKey({
  authorizationHeader,
}: {
  authorizationHeader: string | null;
}): Promise<[{ code: number; error: string }] | [null, ApiKeyRow]> {
  if (authorizationHeader === undefined || !authorizationHeader?.startsWith('Bearer ')) {
    return [{ code: 401, error: "Your 'Authorization' header is either missing or malformed" }];
  }

  const providedApiKey = authorizationHeader?.substring('Bearer '.length);
  const maybeApiKeyInfo = await dbFindApiKey({ apiKey: providedApiKey });

  if (maybeApiKeyInfo === undefined) {
    return [{ code: 401, error: 'The provided api key seems to be invalid' }];
  }

  if (maybeApiKeyInfo.status === 'revoked') {
    return [
      {
        code: 401,
        error: 'The provided api key seems to be revoked. You have to generate a new one.',
      },
    ];
  }

  if (maybeApiKeyInfo.status === 'inactive') {
    return [
      {
        code: 401,
        error:
          'The provided api key seems to be inactive. You have to activate it before using it.',
      },
    ];
  }

  await dbUpdateApiKeyUsage({ apiKeyId: maybeApiKeyInfo.id });

  return [null, maybeApiKeyInfo];
}
