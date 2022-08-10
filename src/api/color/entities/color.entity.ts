import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Exclude()
@Entity()
export class Color {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  colorId: string;

  @Expose()
  @Column()
  colorName: string;

  @Expose()
  @Column()
  colorHex: string;
}
