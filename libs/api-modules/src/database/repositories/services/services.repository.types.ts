import { ServiceCardVariant } from '@demo-A/api-types';

export interface ServicesRepositoryCreateServicePayload {
  cardVariant: ServiceCardVariant;
  title: string;
  shortDescription: string;
  longDescription: string;
  imagePath: string | null;
  imageUrl: string | null;
}

export interface ServicesRepositoryUpdateServicePayload {
  cardVariant?: ServiceCardVariant;
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  imagePath?: string | null;
  imageUrl?: string | null;
}
