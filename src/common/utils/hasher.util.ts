import * as bcrypt from 'bcrypt';

export class Hasher {
  static readonly SALT_ROUNDS = 10;

  static hash(value: string, saltRounds = Hasher.SALT_ROUNDS) {
    return bcrypt.hash(value, saltRounds);
  }

  static compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }

  static needsRehash(hashed: string, saltRounds = 10): boolean {
    return bcrypt.getRounds(hashed) < saltRounds;
  }

  static mask(value: string): string {
    return '*'.repeat(value.length);
  }
}
