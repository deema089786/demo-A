import { z } from 'zod';

import { Timestamp } from '../base';

export type ServiceCardVariant = 'banner' | 'default';

export interface Service extends Timestamp {
  id: string;
  cardVariant: ServiceCardVariant;

  title: string;
  shortDescription: string;
  longDescription: string;

  imagePath: string | null;
  imageUrl: string | null;
}

// region Create Service
export const createServicePayloadSchema = z.object({
  cardVariant: z.enum(['banner', 'default']),
  title: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  imagePath: z.string().nullable(),
  imageUrl: z.string().nullable(),
});
export type CreateServicePayload = z.infer<typeof createServicePayloadSchema>;
export type CreateServiceResponse = {
  success: boolean;
  service: Service | null;
};
// endregion

// region Get Service
export type GetServicesResponse = {
  services: Service[];
};
//
