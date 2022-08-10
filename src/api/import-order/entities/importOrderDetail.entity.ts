import { Exclude, Expose } from 'class-transformer';
import { Shoes } from 'src/api/shoes/entities/shoes.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ImportOrder } from './importOrder.entity';

@Exclude()
@Entity()
export class ImportOrderDetail {
  @Expose()
  @PrimaryColumn('uuid')
  importOrderId: string;

  @Expose()
  @PrimaryColumn('uuid')
  shoesId: string;

  @Expose()
  @ManyToOne(() => ImportOrder, (importOrder) => importOrder.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'importOrderId',
  })
  importOrder: ImportOrder;

  @Expose()
  @ManyToOne(() => Shoes)
  @JoinColumn({
    name: 'shoesId',
  })
  shoes: Shoes;

  @Expose()
  @Column()
  quantity: number;
}
