import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsHexColor, IsOptional, IsString } from 'class-validator';
import { ColorNameMustNotExist } from '../../validators/decorators/colorNameMustNotExist.decorator';

export class EditColorDto {
  @ApiPropertyOptional()
  @ColorNameMustNotExist()
  @IsString()
  @IsOptional()
  colorName?: string;

  @ApiPropertyOptional()
  @IsHexColor()
  @IsOptional()
  colorHex?: string;
}
