import {
    registerDecorator,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidatorOptions,
} from 'class-validator';
import {EntityManager} from 'typeorm';
import {Injectable} from '@nestjs/common';

type IsUniqueConstraintInput = {
    tableName: string;
    column: string;
};

@ValidatorConstraint({name: 'IsUniqueConstraintValidator', async: true})
@Injectable()
export class IsUniqueConstraintValidator implements ValidatorConstraintInterface {
    constructor(private readonly entityManager: EntityManager) {
    }

    async validate(value: string, args: ValidationArguments): Promise<boolean> {
        const {tableName, column}: IsUniqueConstraintInput = args.constraints[0];
        const exists = await this.entityManager
            .getRepository(tableName)
            .createQueryBuilder(tableName)
            .where({[column]: value})
            .getExists();

        return !exists;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments?.property} already exists`;
    }
}

export function IsUnique(
    options: IsUniqueConstraintInput,
    validationOptions?: ValidatorOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'is-unique',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqueConstraintValidator,
        });
    };
}
