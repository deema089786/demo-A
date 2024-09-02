import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User, UserProfile } from '@demo-A/api-types';

import { TimestampEntity } from './base/timestamp.entity';
import { UserProfileEntity } from './user-profile.entity';

@Entity()
export class UserEntity extends TimestampEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('user-phone-number-idx')
  @Column({ type: 'varchar', unique: true, nullable: true })
  phoneNumber!: string | null;

  @Index('user-email-idx')
  @Column({ type: 'varchar', unique: true, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', nullable: true })
  password!: string | null;

  @OneToOne(
    () => UserProfileEntity,
    (userProfileEntity) => userProfileEntity.user,
  )
  profile!: UserProfile | null;
}
