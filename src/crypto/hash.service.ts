import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  private readonly SALT_ROUNDS: number = 11;

  async compare(raw: string, hash: string): Promise<boolean> {
    return bcrypt.compare(raw, hash);
  }

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT_ROUNDS);
  }

  needsRehash(hash: string): boolean {
    return bcrypt.getRounds(hash) !== this.SALT_ROUNDS;
  }

  mask(
    value: string,
    options?: {
      start?: number;
      end?: number;
      maskChar?: string;
    },
  ): string {
    if (!value) return '';

    const length = value.length;
    const maskChar = options?.maskChar ?? '*';

    if (!options) {
      return maskChar.repeat(length);
    }

    let start = options.start ?? 0;
    let end = options.end ?? length;

    if (end < 0) {
      end = length + end;
    }

    start = Math.max(0, start);
    end = Math.min(length, end);

    if (start >= end) return value;

    const maskedSection = maskChar.repeat(end - start);

    return value.slice(0, start) + maskedSection + value.slice(end);
  }
}
