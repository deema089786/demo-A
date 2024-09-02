export type AddServiceCardVariant = 'banner' | 'default';

export type AddServiceCardProps = {
  variant: AddServiceCardVariant;
  onClick(): void;
};
