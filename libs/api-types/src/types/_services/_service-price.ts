import { z } from 'zod';

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

export const servicePricePayloadSchema = z.object({
  enabled: z.boolean(),
  unit: z.enum([
    'no-unit',
    'item',
    'butch',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ]),
  value: z.coerce.number({
    invalid_type_error: 'Invalid value',
  }),
  discountValue: z.coerce
    .number({ invalid_type_error: 'Invalid value' })
    .nullable()
    .default(null),
  amount: z.coerce
    .number({ invalid_type_error: 'Invalid value' })
    .int()
    .positive()
    .nullable()
    .default(null),
});
