import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  refreshTokenId: string;

  @Column({
    type: 'text',
  })
  token: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp with time zone',
  })
  expiredAt: Date;
}
