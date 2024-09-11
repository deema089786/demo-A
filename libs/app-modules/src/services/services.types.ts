import { ServicePriceUnit } from '@demo-A/api-types';

export type ServiceStatus = 'active' | 'draft' | 'archived';

export type ServicePrice = {
  value: number;
  discountValue: number | null;
  unit: ServicePriceUnit;
  amount: number | null;
};

export type Service = {
  status: ServiceStatus;
  id: string;
  imageSrc: string | null;
  title: string;
  shortDescription: string;
  longDescription: string;
  variant: 'banner' | 'default';
  inAppPath: string;
  isPurchaseButtonVisible: boolean;
  price: ServicePrice | null;
};
