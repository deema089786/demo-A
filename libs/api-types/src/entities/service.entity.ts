import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  Service,
  ServiceCardVariant,
  ServiceSupabaseImage,
  ServiceSupabaseImageEntity,
  ServiceStatus,
} from '@demo-A/api-types';

import { TimestampEntity } from './base/timestamp.entity';
import { ServicePriceEntity } from './service-price.entity';

@Entity()
export class ServiceEntity extends TimestampEntity implements Service {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: ['banner', 'default'],
    default: 'default',
  })
  cardVariant!: ServiceCardVariant;

  @Column({
    type: 'enum',
    enum: ['active', 'draft', 'archived', 'deleted'],
    default: 'draft',
  })
  status!: ServiceStatus;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar' })
  shortDescription!: string;

  @Column({ type: 'varchar' })
  longDescription!: string;

  // region options
  @Column({ type: 'boolean', default: false })
  isPurchaseButtonVisible!: boolean;
  // endregion

  @Column({ type: 'varchar', nullable: true })
  imagePath!: string | null;

  @Column({ type: 'varchar', nullable: true })
  imageUrl!: string | null;

  @OneToOne(
    () => ServiceSupabaseImageEntity,
    (serviceSupabaseImageEntity) => serviceSupabaseImageEntity.service,
  )
  supabaseImage!: ServiceSupabaseImage | null;

  @OneToOne(
    () => ServicePriceEntity,
    (servicePriceEntity) => servicePriceEntity.service,
  )
  price!: ServicePriceEntity | null;
}
