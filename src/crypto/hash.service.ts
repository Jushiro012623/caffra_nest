import * as bcrypt from 'bcrypt';
import {Injectable} from "@nestjs/common";

@Injectable()
export class HashService {
    private readonly SALT_ROUNDS = 10;

    async compare(raw: string, hash: string): Promise<boolean> {
        return bcrypt.compare(raw, hash);
    }

    async hash(value: string): Promise<string> {
        return bcrypt.hash(value, this.SALT_ROUNDS);
    }

    needsRehash(hash: string): boolean {
        return bcrypt.getRounds(hash) !== this.SALT_ROUNDS;
    }
}