import { Service } from '@demo-A/app-modules';

export type ServicesPageProps = {
  services: Service[];
  editModeEnabled: boolean;
  isAuthenticated: boolean;
  profileName: string | null;
  profileImageSrc: string | null;
};
