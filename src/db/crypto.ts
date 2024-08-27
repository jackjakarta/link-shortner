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

export function generateRandomUrlSafeString(length: number): string {
  const randomString = crypto.randomBytes(Math.ceil((length * 3) / 4)).toString('base64');
  const urlSafeString = randomString.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return urlSafeString.substring(0, length);
}
