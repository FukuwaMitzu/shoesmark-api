import { Module } from '@nestjs/common';
import { SharedShoesModule } from '../shoes/shared/sharedShoes.module';
import { OrderController } from './order.controller';
import { SharedOrderModule } from './shared/sharedOrder.module';

@Module({
  imports: [SharedShoesModule, SharedOrderModule],
  controllers: [OrderController],
})
export class OrderModule {}
