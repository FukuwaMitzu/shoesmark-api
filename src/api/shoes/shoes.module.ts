import { BadRequestException, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { SharedShoesModule } from './shared/sharedShoes.module';
import { ShoesController } from './shoes.controller';

@Module({
  imports: [
    ConfigModule,
    SharedShoesModule,
    MulterModule.register({
      dest: './uploads',
      fileFilter: (req, file, callback) => {
        if (file.mimetype.match(/^image\/.*/i)) callback(null, true);
        else callback(new BadRequestException('File không hợp lệ'), false);
      },
    }),
  ],
  controllers: [ShoesController],
})
export class ShoesModule {}
