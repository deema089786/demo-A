import { Service as APIService } from '@demo-A/api-types';

import { Service } from './services.types';

export const mapApiServiceToService = (service: APIService): Service => {
  return {
    id: service.id,
    variant: service.cardVariant,
    title: service.title,
    description: service.shortDescription,
    imageSrc: service.supabaseImage ? service.supabaseImage.publicUrl : null,
  };
};
