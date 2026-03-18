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

    confirm(confirm_password: string): boolean {
        return this.plain === confirm_password
    }
}

