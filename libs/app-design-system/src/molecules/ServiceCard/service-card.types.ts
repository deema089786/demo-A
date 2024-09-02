export type ServiceCardVariant = 'banner' | 'default';

export type ServiceCardProps = {
  variant: ServiceCardVariant;
  title: string;
  description: string;
  imageSrc: string;
};
