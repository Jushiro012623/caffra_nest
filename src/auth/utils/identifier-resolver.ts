type UserIdentifierType = 'email' | 'mobile_number' | 'username';

export type UserLookupCriteria = {
  [K in UserIdentifierType]: Record<K, string>;
}[UserIdentifierType];

export class IdentifierResolver {
  static resolve(identifier: string): UserLookupCriteria {
    if (this.isEmail(identifier)) {
      return { email: identifier };
    }

    if (this.isMobileNumber(identifier)) {
      return { mobile_number: identifier };
    }

    return { username: identifier };
  }

  private static isEmail(value: string): boolean {
    return value.includes('@');
  }

  private static isMobileNumber(value: string): boolean {
    return /^09\d{9}$/.test(value);
  }
}
