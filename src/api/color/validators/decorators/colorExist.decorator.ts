import { registerDecorator, ValidationOptions } from 'class-validator';
import {
  ColorExistContraint,
  ColorExistOptions,
} from '../colorExist.constraint';

export function ColorExist(
  options?: ColorExistOptions,
  validationOptions?: ValidationOptions,
) {
  return function (obj: Object, propName: string) {
    registerDecorator({
      propertyName: propName,
      target: obj.constructor,
      validator: ColorExistContraint,
      options: validationOptions,
      constraints: [options],
    });
  };
}
