import { CreateServicePayload } from '@demo-A/api-types';

export const getInitialValues = (params: {
  variant: 'banner' | 'default';
}): CreateServicePayload => ({
  cardVariant: params.variant,
  title: '',
  shortDescription: '',
  longDescription: '',
  supabaseImage: null,
});
