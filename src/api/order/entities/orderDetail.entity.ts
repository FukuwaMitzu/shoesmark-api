import { Exclude, Expose } from 'class-transformer';
import { Shoes } from 'src/api/shoes/entities/shoes.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

@Exclude()
@Entity()
export class OrderDetail {
  @Expose()
  @PrimaryColumn('uuid')
  orderId: string;

  @Expose()
  @PrimaryColumn('uuid')
  shoesId: string;

  @Expose()
  @ManyToOne(() => Order, (order) => order.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'orderId',
  })
  order: Order;

  @Expose()
  @ManyToOne(() => Shoes)
  @JoinColumn({
    name: 'shoesId',
  })
  shoes: Shoes;

  @Expose()
  @Column()
  quantity: number;

  @Expose()
  @Column()
  price: number;

  @Expose()
  @Column({
    type: 'decimal',
  })
  sale: number;
}
