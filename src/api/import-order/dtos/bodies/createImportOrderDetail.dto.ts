import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, Min } from 'class-validator';
import { ShoesIdMustExist } from 'src/api/shoes/validators/decorators/shoesIdMustExist.decorator';

export class CreateImportOrderDetailDto {
  @ApiProperty()
  @ShoesIdMustExist()
  @IsUUID()
  shoesId: string;

  @ApiProperty()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}
