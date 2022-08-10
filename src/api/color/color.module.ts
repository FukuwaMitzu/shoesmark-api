import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { SharedColorModule } from './shared/sharedColor.module';

@Module({
  imports: [SharedColorModule],
  controllers: [ColorController],
})
export class ColorModule {}
