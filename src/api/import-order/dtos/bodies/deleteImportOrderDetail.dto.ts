import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ShoesIdMustExist } from 'src/api/shoes/validators/decorators/shoesIdMustExist.decorator';

export class DeleteImportOrderDetailDto {
  @ApiProperty()
  @ShoesIdMustExist()
  @IsUUID()
  shoesId: string;
}
