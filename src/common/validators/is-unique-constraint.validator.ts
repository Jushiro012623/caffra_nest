import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from 'class-validator';
import { EntityManager, EntityTarget } from 'typeorm';
import { Injectable } from '@nestjs/common';

type IsUniqueConstraintInput = {
  tableName: EntityTarget<any>;
  column: string;
};

@ValidatorConstraint({ name: 'IsUniqueConstraintValidator', async: true })
@Injectable()
export class IsUniqueConstraintValidator implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const constraint = args.constraints[0] as IsUniqueConstraintInput;
    const tableName = constraint.tableName;
    const column = constraint.column;
    const exists = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder('entity')
      .where(`entity.${column} = :value`, { value })
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
