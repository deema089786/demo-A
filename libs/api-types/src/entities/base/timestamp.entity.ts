import { Timestamp } from '@demo-A/api-types';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntity implements Timestamp {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
