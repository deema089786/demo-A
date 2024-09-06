export type Service = {
  id: string;
  imageSrc: string | null;
  title: string;
  shortDescription: string;
  longDescription: string;
  variant: 'banner' | 'default';
  inAppPath: string;
};
