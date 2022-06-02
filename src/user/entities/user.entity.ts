import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Brand } from '../../shared/types/Brand.type';
import { Gender } from '../../shared/types';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: Brand<number, 'userId'>;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column()
  @Exclude()
  password: string;
}
