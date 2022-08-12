import { Exclude, Expose } from 'class-transformer';
import { Brand } from 'src/api/brand/entities/brand.entity';
import { Category } from 'src/api/category/entities/category.entity';
import { Color } from 'src/api/color/entities/color.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Exclude()
export class Shoes {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  shoesId: string;

  @Expose()
  @Column({ length: 100 })
  shoesName: string;

  @Expose()
  @Column({ nullable: true, type: 'text' })
  description: string;

  @Expose()
  @Column()
  shoesImage: string;

  @Expose()
  @Column({ length: 20 })
  UPC: string;

  @Expose()
  @Column({ length: 20 })
  SKU: string;

  @Expose()
  @ManyToMany(() => Category)
  @JoinTable({ name: 'classification' })
  categories: Category[];

  @Expose()
  @ManyToOne(() => Brand, { onDelete: 'SET NULL' })
  @JoinColumn()
  brand: Brand;

  @Expose()
  @ManyToOne(() => Color, { onDelete: 'SET NULL' })
  @JoinColumn()
  color: Color;

  @Expose()
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  size: number;

  @Expose()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Expose()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  importPrice: number;

  @Expose()
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  sale: number;

  @Expose()
  @Column({ default: 0 })
  quantity: number;

  @Expose()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Expose()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
