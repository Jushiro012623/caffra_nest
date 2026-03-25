import {Injectable} from "@nestjs/common";
import {Cipher, createCipheriv, createDecipheriv, Decipher, randomBytes, scrypt} from "node:crypto";
import {promisify} from "node:util";

@Injectable()
export class CipherService {
    private static readonly ALGO: string = 'aes-256-ctr';
    private static readonly IV_LENGTH: number = 16;
    private static readonly KEY_LENGTH: number = 32;

    static async encrypt(text: string, password: string) {
        const iv: Buffer<ArrayBuffer> = randomBytes(this.IV_LENGTH);
        const key: Buffer<ArrayBufferLike> = await this.deriveKey(password);

        const cipher: Cipher = createCipheriv(this.ALGO, key, iv);

        const encrypted: Buffer<ArrayBuffer> = Buffer.concat([cipher.update(text), cipher.final()]);

        return {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex'),
        };
    }

    static async decrypt(
        encrypted: { iv: string; content: string },
        password: string,
    ): Promise<string> {
        const key: Buffer<ArrayBufferLike> = await this.deriveKey(password);

        const decipher: Decipher = createDecipheriv(
            this.ALGO,
            key,
            Buffer.from(encrypted.iv, 'hex'),
        );

        const decrypted: Buffer<ArrayBuffer> = Buffer.concat([
            decipher.update(Buffer.from(encrypted.content, 'hex')),
            decipher.final(),
        ]);

        return decrypted.toString();
    }

    private static async deriveKey(password: string): Promise<Buffer> {
        return (await promisify(scrypt)(
            password,
            'salt',
            this.KEY_LENGTH,
        )) as Buffer;
    }

}