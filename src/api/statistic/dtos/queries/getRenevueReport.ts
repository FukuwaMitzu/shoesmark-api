import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow } from 'class-validator';

export class GetRenevueReportDto {
  @ApiProperty()
  @Type(() => Date)
  @Allow()
  date: Date;
}
