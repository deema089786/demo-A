import { CreateServicePayload } from '@demo-A/api-types';

export const getInitialValues = (params: {
  variant: 'banner' | 'default';
}): CreateServicePayload => ({
  status: 'active',
  cardVariant: params.variant,
  title: '',
  shortDescription: '',
  longDescription: '',
  supabaseImage: null,
});
