import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  isDefined,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Shoes } from '../entities/shoes.entity';

export interface ShoesExistOptions {
  shoesId?: boolean;
  shoesName?: boolean;
}

@ValidatorConstraint({ async: true })
@Injectable()
export class ShoesExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Shoes)
    private readonly shoesRepository: Repository<Shoes>,
  ) {}
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const options = <ShoesExistOptions>validationArguments.constraints[0];
    if (isDefined(options.shoesId)) {
      const data = await this.shoesRepository.count({
        where: { shoesId: value },
      });
      if (options.shoesId) return data > 0;
      return data == 0;
    }
    if (isDefined(options.shoesName)) {
      const data = await this.shoesRepository.count({
        where: { shoesName: value },
      });
      if (options.shoesName) return data > 0;
      return data == 0;
    }
    return true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    const options = <ShoesExistOptions>validationArguments.constraints[0];
    if (options.shoesId === true) return 'Giày không tồn tại';
    if (options.shoesId === false) return 'Giày đã tồn tại';
    if (options.shoesName === true) return 'Tên giày không tồn tại';
    if (options.shoesName === false) return 'Tên giày đã tồn tại';
  }
}
