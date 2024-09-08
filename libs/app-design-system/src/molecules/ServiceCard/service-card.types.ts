import { ServiceStatus } from '@demo-A/app-modules';

export type ServiceCardVariant = 'banner' | 'default';

export type ServiceCardProps = {
  variant: ServiceCardVariant;
  title: string;
  description: string;
  imageSrc: string | null;
  href: string;
  status: ServiceStatus;
  isActionsAvailable: boolean;
  onActionsClick: () => void;
};
