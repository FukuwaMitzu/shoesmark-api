import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Sort } from 'src/shared/enums/Sort.enum';
import { OrderStatus } from '../../enums/orderStatus.enum';

class OrderSortBy {
  @ApiPropertyOptional({ enum: Sort, name: 'sortBy[dateCreated]' })
  @IsEnum(Sort)
  @IsOptional()
  dateCreated?: Sort;

  @ApiPropertyOptional({ enum: Sort, name: 'sortBy[totalPrice]' })
  @IsEnum(Sort)
  @IsOptional()
  totalPrice?: Sort;

  @ApiPropertyOptional({ enum: Sort, name: 'sortBy[datePurchased]' })
  @IsEnum(Sort)
  @IsOptional()
  datePurchased?: Sort;

  @ApiPropertyOptional({ enum: Sort, name: 'sortBy[status]' })
  @IsEnum(Sort)
  @IsOptional()
  status?: Sort;

  @ApiPropertyOptional({ enum: Sort, name: 'sortBy[gender]' })
  @IsEnum(Sort)
  @IsOptional()
  gender?: Sort;

  @ApiPropertyOptional({ enum: Sort, name: 'sortBy[dateUpdated]' })
  @IsEnum(Sort)
  @IsOptional()
  dateUpdated?: Sort;
}

export class GetOrderDto {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number = 32;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  offset?: number = 0;

  @ApiPropertyOptional({
    isArray: true,
    name: 'ids[]',
  })
  @IsUUID('all', { each: true })
  @IsOptional()
  ids?: string[] = [];

  @ApiPropertyOptional({
    isArray: true,
    name: 'ownerIds[]',
  })
  @IsUUID('all', { each: true })
  @IsOptional()
  ownerIds?: string[] = [];

  @ApiPropertyOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  onlyAnonymous?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiPropertyOptional()
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiPropertyOptional({ type: OrderSortBy })
  @Type(() => OrderSortBy)
  @ValidateNested()
  @IsOptional()
  sortBy?: OrderSortBy;
}
