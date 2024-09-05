import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMemo } from 'react';

import { CreateServiceModalController } from './create-service-modal.controller';

const CreateServiceModal = NiceModal.create(CreateServiceModalController);

export const useCreateServiceModal = () => {
  const { show } = useModal(CreateServiceModal);
  return useMemo(() => ({ open: show }), [show]);
};
