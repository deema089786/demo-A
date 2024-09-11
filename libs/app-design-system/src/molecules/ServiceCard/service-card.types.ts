import { ServiceStatus } from '@demo-A/app-modules';
import { ServicePriceUnit } from '@demo-A/api-types';

export type ServiceCardPropsVariant = 'banner' | 'default';

export type ServiceCardPropsPrice = {
  value: number;
  discountValue: number | null;
  unit: ServicePriceUnit;
  amount: number | null;
};

export type ServiceCardProps = {
  variant: ServiceCardPropsVariant;
  title: string;
  description: string;
  imageSrc: string | null;
  href: string;
  status: ServiceStatus;
  isActionsAvailable: boolean;
  onActionsClick: () => void;
  isPurchaseButtonVisible: boolean;
  price: ServiceCardPropsPrice | null;
};
