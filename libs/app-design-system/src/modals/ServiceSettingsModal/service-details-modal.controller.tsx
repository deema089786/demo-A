import React, { useCallback } from 'react';
import { useModal } from '@ebay/nice-modal-react';

import { ServiceDetailsModalProps } from './service-details-modal.types';
import { ModalDrawer } from '../components';
import { ServiceDetailsModalView } from './service-details-modal.view';

export const ServiceDetailsModalController: React.FC<
  ServiceDetailsModalProps
> = (props) => {
  const { serviceTitle, serviceDescription, serviceImageSrc, onClosed } = props;

  const { visible, hide, remove } = useModal();

  const handleExited = useCallback(() => {
    onClosed?.();
    remove();
  }, [remove, onClosed]);

  return (
    <ModalDrawer open={visible} onClose={hide} onExited={handleExited}>
      <ServiceDetailsModalView
        serviceTitle={serviceTitle}
        serviceDescription={serviceDescription}
        serviceImageSrc={serviceImageSrc}
      />
    </ModalDrawer>
  );
};
