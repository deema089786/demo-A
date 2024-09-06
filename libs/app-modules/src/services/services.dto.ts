import { Service as APIService } from '@demo-A/api-types';

import { Service } from './services.types';

export const mapApiServiceToService = (service: APIService): Service => {
  return {
    id: service.id,
    variant: service.cardVariant,
    title: service.title,
    shortDescription: service.shortDescription,
    longDescription: service.longDescription,
    imageSrc: service.supabaseImage ? service.supabaseImage.publicUrl : null,
    inAppPath: `/services/${service.id}`,
  };
};
