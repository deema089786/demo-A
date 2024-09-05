import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service, ServiceSupabaseImage } from '@demo-A/api-types';

import { TimestampEntity } from './base/timestamp.entity';
import { ServiceEntity } from './service.entity';

@Entity()
export class ServiceSupabaseImageEntity
  extends TimestampEntity
  implements ServiceSupabaseImage
{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  supabaseId!: string;

  @Column({ type: 'varchar' })
  publicUrl!: string;

  @Column({ type: 'varchar' })
  path!: string;

  @Column({ type: 'varchar' })
  fullPath!: string;

  @OneToOne(() => ServiceEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'serviceId' })
  service!: Service | null;

  @Column('uuid')
  serviceId!: string;
}
