import { Service } from '@demo-A/app-modules';
import { CreateServicePayload } from '@demo-A/api-types';

export type ServicesPageProps = {
  services: Service[];
  isEditModeEnabled: boolean;
  isAuthenticated: boolean;
  profileName: string | null;
  profileImageSrc: string | null;
  onCreateServiceClick(variant: 'banner' | 'default'): void;
  isServiceSettingsAvailable: boolean;
  onServiceSettingsClick(params: { serviceId: string }): void;
};
