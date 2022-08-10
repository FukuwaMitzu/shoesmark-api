import { registerDecorator, ValidationOptions } from 'class-validator';
import {
  ShoesExistConstraint,
  ShoesExistOptions,
} from '../shoesExist.constraint';

export function ShoesExist(
  options?: ShoesExistOptions,
  validationOptions?: ValidationOptions,
) {
  return function (obj: Object, propName: string) {
    registerDecorator({
      propertyName: propName,
      target: obj.constructor,
      validator: ShoesExistConstraint,
      constraints: [options],
      options: validationOptions,
    });
  };
}
