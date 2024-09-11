import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service, ServicePriceUnit, ServicePrice } from '@demo-A/api-types';

import { TimestampEntity } from './base/timestamp.entity';
import { ServiceEntity } from './service.entity';

@Entity()
export class ServicePriceEntity
  extends TimestampEntity
  implements ServicePrice
{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: ['no-unit', 'item', 'butch', 'day', 'hour', 'week', 'month', 'year'],
    default: 'no-unit',
  })
  unit!: ServicePriceUnit;

  @Column({ type: 'float' })
  value!: number;

  @Column({ type: 'float', nullable: true })
  discountValue!: number | null;

  @Column({ type: 'integer', nullable: true })
  amount!: number | null;

  @OneToOne(() => ServiceEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'serviceId' })
  service!: Service | null;

  @Column('uuid')
  serviceId!: string;
}
