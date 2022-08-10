import { ValidationOptions } from 'class-validator';
import { ShoesExist } from './shoesExist.decorator';

export function ShoesNameMustNotExist(options?: ValidationOptions) {
  return ShoesExist({ shoesName: false }, options);
}
