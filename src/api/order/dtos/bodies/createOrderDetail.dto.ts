import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { ShoesIdMustExist } from 'src/api/shoes/validators/decorators/shoesIdMustExist.decorator';

export class CreateOrderDetailDto {
  @ApiProperty()
  @ShoesIdMustExist()
  @IsUUID()
  shoesId: string;

  @ApiPropertyOptional()
  @Min(1)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiPropertyOptional()
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  sale: number;

  @ApiPropertyOptional()
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  price: number;
}
