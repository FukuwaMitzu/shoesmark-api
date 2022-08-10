import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsUUID, Min } from 'class-validator';
import { ShoesIdMustExist } from 'src/api/shoes/validators/decorators/shoesIdMustExist.decorator';

export class EditOrderDetailDto {
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
