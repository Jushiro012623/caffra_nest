import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

type IsExistInput = {
  tableName: string;
  column: string;
};

@ValidatorConstraint({ name: 'IsExistsValidator', async: true })
@Injectable()
export class IsExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any[], args: ValidationArguments): Promise<boolean> {
    const { tableName, column }: IsExistInput = args.constraints[0];

    return await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists();
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} does not exist`;
  }
}

export function IsExists(
  options: IsExistInput,
  validationOptions?: ValidatorOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'is-exist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsExistsValidator,
    });
  };
}
