import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMemo } from 'react';

import { ServiceDetailsModalController } from './service-details-modal.controller';

const ServiceDetailsModal = NiceModal.create(ServiceDetailsModalController);

export const useServiceDetailsModal = () => {
  const { show, hide } = useModal(ServiceDetailsModal);
  return useMemo(() => ({ open: show, close: hide }), [show, hide]);
};
