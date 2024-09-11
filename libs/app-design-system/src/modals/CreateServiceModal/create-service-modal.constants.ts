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
  price: {
    enabled: false,
    unit: 'no-unit',
    value: 0,
    discountValue: null,
    amount: null,
  },
});
