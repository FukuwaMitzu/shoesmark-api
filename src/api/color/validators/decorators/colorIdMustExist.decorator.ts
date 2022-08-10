import { ValidationOptions } from 'class-validator';
import { ColorExist } from './colorExist.decorator';

export function ColorIdMustExist(options?: ValidationOptions) {
  return ColorExist({ colorId: true }, options);
}
