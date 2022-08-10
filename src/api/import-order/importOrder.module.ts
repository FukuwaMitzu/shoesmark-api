import { Module } from '@nestjs/common';
import { SharedShoesModule } from '../shoes/shared/sharedShoes.module';
import { ImportOrderController } from './importOrder.controller';
import { SharedImportOrderModule } from './shared/sharedImportOrder.module';

@Module({
  imports: [SharedShoesModule, SharedImportOrderModule],
  controllers: [ImportOrderController],
})
export class ImportOrderModule {}
