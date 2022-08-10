import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorService } from '../color.service';
import { Color } from '../entities/color.entity';
import { ColorExistContraint } from '../validators/colorExist.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorService, ColorExistContraint],
  exports: [ColorService, ColorExistContraint],
})
export class SharedColorModule {}
