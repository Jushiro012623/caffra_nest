import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from 'class-validator';
import { EntityManager, EntityTarget } from 'typeorm';
import { Injectable } from '@nestjs/common';

type IsExistInput = {
  tableName: EntityTarget<any>;
  column: string;
};

@ValidatorConstraint({ name: 'IsExistsValidator', async: true })
@Injectable()
export class IsExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const constraint = args.constraints[0] as IsExistInput;
    const tableName = constraint.tableName;
    const column = constraint.column;

    return await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder('entity')
      .where(`entity.${column} = :value`, { value })
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
