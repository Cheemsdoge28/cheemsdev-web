// lib/crypto.ts
import crypto from 'crypto';

const algorithm = 'aes-256-gcm'; // strong and authenticated
const secret = Buffer.from(process.env.ENCRYPTION_SECRET!, 'hex');

export function encrypt(text: string) {
  const iv = crypto.randomBytes(12); // GCM recommends 12-byte IV
  const cipher = crypto.createCipheriv(algorithm, secret, iv);

  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

export function decrypt(encryptedBase64: string) {
  const data = Buffer.from(encryptedBase64, 'base64');
  const iv = data.slice(0, 12);
  const tag = data.slice(12, 28);
  const encrypted = data.slice(28);

  const decipher = crypto.createDecipheriv(algorithm, secret, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
}
