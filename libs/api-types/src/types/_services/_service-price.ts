import { Timestamp } from '../base';
import { Service } from './_services';

export type ServicePriceUnit =
  | 'no-unit'
  | 'item'
  | 'butch'
  | 'day'
  | 'hour'
  | 'week'
  | 'month'
  | 'year';

export interface ServicePrice extends Timestamp {
  id: string;
  value: number;
  discountValue: number | null;
  unit: ServicePriceUnit;
  amount: number | null;

  service: Service | null;
}
