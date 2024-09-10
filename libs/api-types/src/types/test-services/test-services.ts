import { z } from 'zod';

import { Timestamp } from '../base';
import {
  TestServiceSupabaseImage,
  supabaseImagePayloadSchema,
} from './test-service-supabase-image';

export type ServiceCardVariant = 'banner' | 'default';
export type ServiceStatus = 'active' | 'draft' | 'archived' | 'deleted';

export interface Service extends Timestamp {
  id: string;
  cardVariant: ServiceCardVariant;
  status: ServiceStatus;

  title: string;
  shortDescription: string;
  longDescription: string;

  supabaseImage: TestServiceSupabaseImage | null;
}

// region Create Service
export const createServicePayloadSchema = z.object({
  status: z.enum(['active', 'draft', 'archived']),
  cardVariant: z.enum(['banner', 'default']),
  title: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  supabaseImage: supabaseImagePayloadSchema.nullable(),
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
  newSupabaseImage: supabaseImagePayloadSchema.nullable(),
});
export type UpdateServicePayload = z.infer<typeof updateServicePayloadSchema>;
export type UpdateServiceResponse = {
  success: boolean;
  service: Service | null;
};
// endregion
