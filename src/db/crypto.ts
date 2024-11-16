import crypto from 'crypto';

type HashAlgorithm = 'sha256' | 'sha512' | 'md5';

export function makeHash(data: string, hashAlgorithm: HashAlgorithm = 'sha512') {
  const hash = crypto.createHash(hashAlgorithm).update(data).digest('hex');

  return hash;
}

export function generateSalt(length = 30) {
  return crypto.randomBytes(length).toString('hex');
}

export function createPasswordHash(planePassword: string, salt: string) {
  return makeHash(`${planePassword}${salt}`);
}

export async function generateAndHashApiKey(): Promise<{
  apiKey: string;
  hashedApiKey: string;
}> {
  const apiKey = crypto.randomBytes(32).toString('hex');

  const hashedApiKey = hashApiKey({ apiKey });

  return { apiKey, hashedApiKey };
}

export function obscureApiKey(apiKey: string) {
  return `${'*'.repeat(10)}${apiKey.substring(apiKey.length - 4, apiKey.length)}`;
}

export function hashApiKey({ apiKey }: { apiKey: string }): string {
  return crypto.createHash('sha512').update(apiKey).digest('hex');
}
