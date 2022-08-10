import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shoes } from '../entities/shoes.entity';
import { ShoesService } from '../shoes.service';
import { ShoesExistConstraint } from '../validators/shoesExist.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([Shoes])],
  providers: [ShoesService, ShoesExistConstraint],
  exports: [ShoesService, ShoesExistConstraint],
})
export class SharedShoesModule {}
