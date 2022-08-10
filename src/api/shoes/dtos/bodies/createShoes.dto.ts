import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateShoesDto {
  @ApiProperty()
  @IsString()
  shoesName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: 'file',
    format: 'binary',
  })
  shoesImage;

  @ApiProperty()
  @Length(1, 20)
  @IsString()
  UPC: string;

  @ApiProperty()
  @Length(1, 20)
  @IsString()
  SKU: string;

  @ApiPropertyOptional({
    isArray: true,
    type: String,
    name: 'categories[]',
  })
  @CategoryIdMustExist({ each: true })
  @IsUUID('all', { each: true })
  @Transform((data) => {
    if (!isArray(data.value)) return [];
    const result = data.value[0] as string;
    return result.split(',');
  })
  @IsArray()
  @IsOptional()
  categories?: string[];

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

  @ApiProperty()
  @IsPositive()
  @Type(() => Number)
  @IsNumber()
  size: number;

  @ApiProperty()
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty()
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  importPrice: number;

  @ApiProperty()
  @Max(100)
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  sale: number;

  @ApiProperty()
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  quantity: number;
}
