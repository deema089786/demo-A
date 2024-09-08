export type ServiceStatus = 'active' | 'draft' | 'archived';
export type Service = {
  status: ServiceStatus;
  id: string;
  imageSrc: string | null;
  title: string;
  shortDescription: string;
  longDescription: string;
  variant: 'banner' | 'default';
  inAppPath: string;
};
