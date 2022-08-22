import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ShoesIdMustExist } from '../../validators/decorators/shoesIdMustExist.decorator';

export class GetRelatedDto {
  @ApiProperty()
  @ShoesIdMustExist()
  @IsUUID()
  shoesId: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit = 32;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  offset = 0;
}
