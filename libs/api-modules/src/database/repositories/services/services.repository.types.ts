import { ServiceCardVariant } from '@demo-A/api-types';

export interface ServicesRepositoryCreateServicePayload {
  cardVariant: ServiceCardVariant;
  title: string;
  shortDescription: string;
  longDescription: string;
  supabaseImage: {
    id: string;
    publicUrl: string;
    path: string;
    fullPath: string;
  } | null;
}

export interface ServicesRepositoryUpdateServicePayload {
  cardVariant?: ServiceCardVariant;
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  supabaseImage?: {
    id: string;
    publicUrl: string;
    path: string;
    fullPath: string;
  } | null;
}
