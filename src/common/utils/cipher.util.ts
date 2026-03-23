import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scrypt,
} from 'node:crypto';
import { promisify } from 'node:util';

export class Cipher {
  private static readonly ALGO = 'aes-256-ctr';
  private static readonly IV_LENGTH = 16;
  private static readonly KEY_LENGTH = 32;

  private static async deriveKey(password: string): Promise<Buffer> {
    return (await promisify(scrypt)(
      password,
      'salt',
      this.KEY_LENGTH,
    )) as Buffer;
  }

  static async encrypt(text: string, password: string) {
    const iv = randomBytes(this.IV_LENGTH);
    const key = await this.deriveKey(password);

    const cipher = createCipheriv(this.ALGO, key, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    };
  }

  static async decrypt(
    encrypted: { iv: string; content: string },
    password: string,
  ): Promise<string> {
    const key = await this.deriveKey(password);

    const decipher = createDecipheriv(
      this.ALGO,
      key,
      Buffer.from(encrypted.iv, 'hex'),
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted.content, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}
