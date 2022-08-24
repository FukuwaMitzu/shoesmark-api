import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  Allow,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ColorIdMustExist } from 'src/api/color/validators/decorators/colorIdMustExist.decorator';
import { Sort } from 'src/shared/enums/Sort.enum';

class ShoesSortByDto {
  @ApiPropertyOptional({ enum: Sort, name: 'sortBy[sale]' })
  @IsEnum(Sort)
  @IsOptional()
  sale?: Sort;
}
class NumberRange {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  from: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  to?: number;
}

class DateRange {
  @ApiProperty()
  @Allow()
  @Type(() => Date)
  since: Date;

  @ApiPropertyOptional()
  @Type(() => Date)
  @IsOptional()
  to?: Date;
}

export class GetShoesDto {
  @ApiPropertyOptional()
  @Type(() => Number)
  @Max(100)
  @IsPositive()
  @IsNumber()
  @IsOptional()
  limit?: number = 32;

  @ApiPropertyOptional()
  @Type(() => Number)
  @Min(0)
  @IsNumber()
  @IsOptional()
  offset?: number = 0;

  @ApiPropertyOptional({
    isArray: true,
    name: 'ids[]',
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  ids?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  shoesName?: string;

  @ApiPropertyOptional({
    isArray: true,
    name: 'categoryIds[]',
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  categoryIds?: string[];

  @ApiPropertyOptional()
  @ColorIdMustExist()
  @IsUUID()
  @IsOptional()
  colorId?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  size?: number;

  @ApiPropertyOptional()
  @IsString()
  @Type(() => String)
  @IsOptional()
  SKU?: string;

  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => NumberRange)
  @IsOptional()
  price?: NumberRange;

  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => NumberRange)
  @IsOptional()
  sale?: NumberRange;

  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => DateRange)
  @IsOptional()
  dateCreated?: DateRange;

  @ApiPropertyOptional({ type: ShoesSortByDto })
  @Type(() => ShoesSortByDto)
  @ValidateNested()
  @IsOptional()
  sortBy?: ShoesSortByDto;
}
