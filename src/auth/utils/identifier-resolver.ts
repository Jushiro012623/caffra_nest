export type UserIdentifierType = 'email' | 'mobile_number' | 'username';

export type UserLookupCriteria = {
    [K in UserIdentifierType]: Record<K, string>;
}[UserIdentifierType];

export class IdentifierResolver {
    private readonly key: UserIdentifierType;
    private readonly value: string;

    constructor(private readonly identifier: string) {
        if (IdentifierResolver.isEmail(identifier)) {
            this.key = 'email';
        } else if (IdentifierResolver.isMobileNumber(identifier)) {
            this.key = 'mobile_number';
        } else {
            this.key = 'username';
        }

        this.value = identifier;
    }

    static resolve(identifier: string): UserLookupCriteria {
        if (this.isEmail(identifier)) {
            return {email: identifier};
        }

        if (this.isMobileNumber(identifier)) {
            return {mobile_number: identifier};
        }

        return {username: identifier};
    }

    resolve(): UserLookupCriteria {
        return {[this.key]: this.value} as Record<UserIdentifierType, string>;
    }

    getKey(): UserIdentifierType {
        return this.key;
    }

    getValue(): string {
        return this.value;
    }

    private static isEmail(value: string): boolean {
        return value.includes('@');
    }

    private static isMobileNumber(value: string): boolean {
        return /^09\d{9}$/.test(value);
    }

}
