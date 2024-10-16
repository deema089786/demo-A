import { boolean, z } from 'zod';

import { Timestamp } from '../base';
import {
  ServiceSupabaseImage,
  supabaseImagePayloadSchema,
} from './_service-supabase-image';
import { ServicePrice, servicePricePayloadSchema } from './_service-price';

export type ServiceCardVariant = 'banner' | 'default';
export type ServiceStatus = 'active' | 'draft' | 'archived' | 'deleted';

export interface Service extends Timestamp {
  id: string;
  cardVariant: ServiceCardVariant;
  status: ServiceStatus;

  title: string;
  shortDescription: string;
  longDescription: string;

  // region options
  isPurchaseButtonVisible: boolean;
  // endregion

  supabaseImage: ServiceSupabaseImage | null;
  price: ServicePrice | null;
}

// region Create Service
export const createServicePayloadSchema = z.object({
  status: z.enum(['active', 'draft', 'archived']),
  cardVariant: z.enum(['banner', 'default']),
  title: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  supabaseImage: supabaseImagePayloadSchema.nullable(),

  //region option
  isPurchaseButtonVisible: z.boolean(),
  //endregion

  price: servicePricePayloadSchema,
});
export type CreateServicePayload = z.infer<typeof createServicePayloadSchema>;
export type CreateServiceResponse = {
  success: boolean;
  service: Service | null;
};
// endregion

// region Get Service
export const getServicesQuerySchema = z.object({
  statusIncludes: z.enum(['active', 'draft', 'archived']).array().optional(),
});
export type GetServicesQuery = z.infer<typeof getServicesQuerySchema>;
export type GetServicesResponse = {
  services: Service[];
};

export type GetServiceResponse = {
  service: Service | null;
};
//

// region Update Service Status
export const updateServiceStatusPayloadSchema = z.object({
  id: z.string(),
  status: z.enum(['active', 'draft', 'archived', 'deleted']),
});

export type UpdateServiceStatusPayload = z.infer<
  typeof updateServiceStatusPayloadSchema
>;
export type UpdateServiceStatusResponse = { success: boolean };
// endregion

// region Update Service
export const updateServicePayloadSchema = z.object({
  id: z.string(),
  status: z.enum(['active', 'draft', 'archived', 'deleted']),
  cardVariant: z.enum(['banner', 'default']),
  title: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  //region option
  isPurchaseButtonVisible: z.boolean(),
  //endregion
  newSupabaseImage: supabaseImagePayloadSchema.nullable(),
  price: servicePricePayloadSchema,
});
export type UpdateServicePayload = z.infer<typeof updateServicePayloadSchema>;
export type UpdateServiceResponse = {
  success: boolean;
  service: Service | null;
};
// endregion
