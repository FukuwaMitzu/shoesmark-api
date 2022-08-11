import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  isArray,
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';
import { BrandIdMustExist } from 'src/api/brand/validators/decorators/brandIdMustExist.decorator';
import { CategoryIdMustExist } from 'src/api/category/validators/decorators/categoryIdMustExist.decorator';
import { ColorIdMustExist } from 'src/api/color/validators/decorators/colorIdMustExist.decorator';

export class EditShoesDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  shoesName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    type: 'file',
    format: 'binary',
  })
  @IsOptional()
  shoesImage?;

  @ApiPropertyOptional()
  @Length(1, 20)
  @IsString()
  @IsOptional()
  UPC?: string;

  @ApiPropertyOptional()
  @Length(1, 20)
  @IsString()
  @IsOptional()
  SKU?: string;

  @ApiPropertyOptional({
    type: [String],
    name: 'categories',
  })
  @CategoryIdMustExist({ each: true })
  @Transform((data) => {
    try {
      return JSON.parse(data.value);
    } catch {
      return data.value.split(',');
    }
  })
  @IsArray()
  @IsOptional()
  categories?: string[] = [];

  @ApiPropertyOptional()
  @BrandIdMustExist()
  @IsUUID()
  @IsOptional()
  brandId?: string;

  @ApiPropertyOptional()
  @ColorIdMustExist()
  @IsUUID()
  @IsOptional()
  colorId?: string;

  @ApiPropertyOptional()
  @IsPositive()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  size?: number;

  @ApiPropertyOptional()
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional()
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  importPrice?: number;

  @ApiPropertyOptional()
  @Max(100)
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  sale?: number;

  @ApiPropertyOptional()
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
