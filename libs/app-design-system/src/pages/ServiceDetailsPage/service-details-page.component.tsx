import React, { useState } from 'react';

import { ServiceDetailsPageProps } from './service-details-page.types';
import { ModalDrawer } from '../../modals/components';
import { ServiceDetailsModalView } from '../../modals';

export const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = (
  props,
) => {
  const { serviceTitle, serviceDescription, serviceImageSrc, onExited } = props;

  const [open, setOpen] = useState(true);

  return (
    <ModalDrawer open={open} onClose={() => setOpen(false)} onExited={onExited}>
      <ServiceDetailsModalView
        serviceTitle={serviceTitle}
        serviceDescription={serviceDescription}
        serviceImageSrc={serviceImageSrc}
      />
    </ModalDrawer>
  );
};
