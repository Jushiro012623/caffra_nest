import * as bcrypt from 'bcrypt';

export class Password {
    constructor(private plain: string) {
    }

    async matches(hash: string): Promise<boolean> {
        return bcrypt.compare(this.plain, hash);
    }

    static async hash(plain: string, saltRounds = 10): Promise<string> {
        return bcrypt.hash(plain, saltRounds);
    }

    static async compare(plain: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plain, hash);
    }

    static needsRehash(hash: string, saltRounds = 10): boolean {
        const currentRounds = bcrypt.getRounds(hash);
        return currentRounds < saltRounds;
    }

    static mask(password: string): string {
        return '*'.repeat(password.length);
    }

}

