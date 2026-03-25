import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsConfirmedValidator', async: false })
@Injectable()
export class IsConfirmedValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    const relatedPropertyName = args.constraints[0] as string;
    const relatedValue = args.object[relatedPropertyName] as string;
    return value === relatedValue;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `${validationArguments.property} must match ${validationArguments.constraints[0]}`;
  }
}

export function IsConfirmed(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsConfirmedValidator,
    });
  };
}
