import { ServiceCardVariant, ServiceStatus } from '@demo-A/api-types';

export interface ServicesRepositoryCreateServicePayload {
  status: ServiceStatus;
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
  status?: ServiceStatus;
  cardVariant?: ServiceCardVariant;
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  newSupabaseImage?: {
    id: string;
    publicUrl: string;
    path: string;
    fullPath: string;
  } | null;
}
