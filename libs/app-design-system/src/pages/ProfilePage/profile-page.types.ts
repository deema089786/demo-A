import { AuthCreatePasswordPayload } from '@demo-A/api-types';

export type ProfilePageProps = {
  profileName: string | null;
  profileImageSrc: string | null;
  isCreatePasswordEnabled: boolean;
  onLogout(): void;
  onCreatePassword(payload: AuthCreatePasswordPayload): void;
  isCreatePasswordLoading: boolean;
};
