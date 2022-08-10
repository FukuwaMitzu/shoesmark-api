import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ShoesIdMustExist } from '../../validators/decorators/shoesIdMustExist.decorator';

export class ShoesParamDto {
  @ApiProperty()
  @ShoesIdMustExist()
  @IsUUID()
  id: string;
}
