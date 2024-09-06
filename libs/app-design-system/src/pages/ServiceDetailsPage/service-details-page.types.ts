import { Service } from '@demo-A/app-modules';

export type ServiceDetailsPageProps = {
  service: Service;
  isEditModeEnabled: boolean;
  isAuthenticated: boolean;
  profileName: string | null;
  profileImageSrc: string | null;
  onExited?(): void;
};
