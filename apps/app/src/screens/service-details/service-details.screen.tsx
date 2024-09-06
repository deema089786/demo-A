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
        service={service}
        isEditModeEnabled={false}
        isAuthenticated={false}
        profileName={null}
        profileImageSrc={null}
        onExited={() => navigate('/', { replace: true })}
      />
    );
  }
  return (
    <ServiceDetailsPage
      isAuthenticated
      service={service}
      isEditModeEnabled={profile.isEditModeEnabled}
      profileName={profile.fullName}
      profileImageSrc={profile.image}
      onExited={() => navigate('/', { replace: true })}
    />
  );
};
