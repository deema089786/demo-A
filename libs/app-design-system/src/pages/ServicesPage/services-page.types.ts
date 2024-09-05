import { Service } from '@demo-A/app-modules';

export type ServicesPageProps = {
  services: Service[];
  isEditModeEnabled: boolean;
  isAuthenticated: boolean;
  profileName: string | null;
  profileImageSrc: string | null;
  onCreateServiceClick(variant: 'banner' | 'default'): void;
};
