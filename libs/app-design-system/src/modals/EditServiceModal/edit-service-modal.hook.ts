import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMemo } from 'react';

import { EditServiceModalController } from './edit-service-modal.controller';

const EditServiceModal = NiceModal.create(EditServiceModalController);

export const useEditServiceModal = () => {
  const { show, hide } = useModal(EditServiceModal);
  return useMemo(() => ({ open: show, close: hide }), [show, hide]);
};
