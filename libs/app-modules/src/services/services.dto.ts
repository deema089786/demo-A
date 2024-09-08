import { Service as APIService } from '@demo-A/api-types';

import { Service, ServiceStatus } from './services.types';

export const mapApiServiceToService = (service: APIService): Service => {
  const status: ServiceStatus = ['active', 'draft', 'archived'].includes(
    service.status,
  )
    ? (service.status as ServiceStatus)
    : 'active';

  return {
    id: service.id,
    status,
    variant: service.cardVariant,
    title: service.title,
    shortDescription: service.shortDescription,
    longDescription: service.longDescription,
    imageSrc: service.supabaseImage ? service.supabaseImage.publicUrl : null,
    inAppPath: `/services/${service.id}`,
  };
};
