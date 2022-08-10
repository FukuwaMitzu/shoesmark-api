import { ValidationOptions } from 'class-validator';
import { ColorExist } from './colorExist.decorator';

export function ColorNameMustNotExist(options?: ValidationOptions) {
  return ColorExist({ colorName: false }, options);
}
