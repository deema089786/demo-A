import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMemo } from 'react';

import { ConfirmationModalController } from './confirmation-modal.controller';

const ConfirmationModal = NiceModal.create(ConfirmationModalController);

export const useConfirmationModal = () => {
  const { show } = useModal(ConfirmationModal);
  return useMemo(() => ({ open: show }), [show]);
};
