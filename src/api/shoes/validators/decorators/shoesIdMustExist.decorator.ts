import { ValidationOptions } from 'class-validator';
import { ShoesExist } from './shoesExist.decorator';

export function ShoesIdMustExist(options?: ValidationOptions) {
  return ShoesExist({ shoesId: true }, options);
}
