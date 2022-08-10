import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { ShoesIdMustExist } from 'src/api/shoes/validators/decorators/shoesIdMustExist.decorator';

export class EditImportOrderDetailDto {
  @ApiProperty()
  @ShoesIdMustExist()
  @IsUUID()
  shoesId: string;

  @ApiProperty()
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  quantity: number;
}
