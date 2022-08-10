import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  isDefined,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Color } from '../entities/color.entity';

export interface ColorExistOptions {
  colorId?: boolean;
  colorName?: boolean;
}

@ValidatorConstraint({ async: true })
@Injectable()
export class ColorExistContraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const options = <ColorExistOptions>validationArguments.constraints[0];
    if (isDefined(options.colorId)) {
      const result = await this.colorRepository.count({
        where: { colorId: value },
      });
      if (options.colorId) return result > 0;
      return result == 0;
    }

    if (isDefined(options.colorName)) {
      const result = await this.colorRepository.count({
        where: { colorName: value },
      });
      if (options.colorName) return result > 0;
      return result == 0;
    }
    return true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    const options = <ColorExistOptions>validationArguments.constraints[0];
    if (options.colorId === true) return 'Màu không tồn tại';
    if (options.colorId === false) return 'Màu đã tồn tại';
    if (options.colorName === true) return 'Tên màu không tồn tại';
    if (options.colorName === false) return 'Tên màu đã tồn tại';
  }
}
