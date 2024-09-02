import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User, UserProfile } from '@demo-A/api-types';

import { TimestampEntity } from './base/timestamp.entity';
import { UserEntity } from './user.entity';

@Entity()
export class UserProfileEntity extends TimestampEntity implements UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: true })
  firstName!: string | null;

  @Column({ type: 'varchar', nullable: true })
  lastName!: string | null;

  @Column({ type: 'varchar', nullable: true })
  image!: string | null;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User | null;

  @Column('uuid')
  userId!: string;
}
