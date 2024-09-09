import React from 'react';
import { ServiceDetailsPage } from '@demo-A/app-design-system';
import { useAuth, useServiceByIdQuery } from '@demo-A/app-modules';
import { useNavigate, useParams } from 'react-router-dom';

export const ServiceDetailsScreen: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { serviceId = '' } = useParams<{ serviceId: string }>();

  const { service, isLoading } = useServiceByIdQuery({ id: serviceId });

  if (isLoading) return null;
  if (!service) return null;

  if (!profile) {
    return (
      <ServiceDetailsPage
        serviceTitle={service.title}
        serviceDescription={service.longDescription}
        serviceImageSrc={service.imageSrc || ''}
        onExited={() => navigate('/', { replace: true })}
      />
    );
  }
  // TODO handled Authenticated view
  return (
    <ServiceDetailsPage
      serviceTitle={service.title}
      serviceDescription={service.longDescription}
      serviceImageSrc={service.imageSrc || ''}
      onExited={() => navigate('/', { replace: true })}
    />
  );
};
