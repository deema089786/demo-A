import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useCallback, useMemo } from 'react';

import { ConfirmationModalController } from './confirmation-modal.controller';
import {
  ConfirmationModalProps,
  ConfirmationModalResolves,
} from './confirmation-modal.types';

const ConfirmationModal = NiceModal.create(ConfirmationModalController);

export const useConfirmationModal = () => {
  const { show } = useModal(ConfirmationModal);
  const open = useCallback<
    (props: ConfirmationModalProps) => Promise<ConfirmationModalResolves>
  >((props) => show(props) as Promise<ConfirmationModalResolves>, [show]);

  return useMemo(() => ({ open }), [open]);
};
