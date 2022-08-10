import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsString } from 'class-validator';
import { ColorNameMustNotExist } from '../../validators/decorators/colorNameMustNotExist.decorator';

export class CreateColorDto {
  @ApiProperty()
  @ColorNameMustNotExist()
  @IsString()
  colorName: string;

  @ApiProperty()
  @IsHexColor()
  colorHex: string;
}
