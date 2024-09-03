export type ProfilePageProps = {
  profileName: string | null;
  profileImageSrc: string | null;
  isCreatePasswordEnabled: boolean;
  onLogout(): void;
};
