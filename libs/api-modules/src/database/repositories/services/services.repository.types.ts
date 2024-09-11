import {
  ServiceCardVariant,
  ServicePriceUnit,
  ServiceStatus,
} from '@demo-A/api-types';

export interface ServicesRepositoryCreateServicePayload {
  status: ServiceStatus;
  cardVariant: ServiceCardVariant;
  title: string;
  shortDescription: string;
  longDescription: string;
  isPurchaseButtonVisible: boolean;
  supabaseImage: {
    id: string;
    publicUrl: string;
    path: string;
    fullPath: string;
  } | null;
  price: {
    value: number;
    discountValue: number | null;
    amount: number | null;
    unit: ServicePriceUnit;
  } | null;
}

export interface ServicesRepositoryUpdateServicePayload {
  status?: ServiceStatus;
  cardVariant?: ServiceCardVariant;
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  isPurchaseButtonVisible?: boolean;
  newSupabaseImage?: {
    id: string;
    publicUrl: string;
    path: string;
    fullPath: string;
  } | null;
}
