import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ColorIdMustExist } from '../../validators/decorators/colorIdMustExist.decorator';

export class ColorParamDto {
  @ApiProperty()
  @ColorIdMustExist()
  @IsUUID('all')
  id: string;
}
