import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMemo } from 'react';

import { ServiceSettingsModalController } from './service-settings-modal.controller';

const ServiceSettingsModal = NiceModal.create(ServiceSettingsModalController);

export const useServiceSettingsModal = () => {
  const { show, hide } = useModal(ServiceSettingsModal);
  return useMemo(() => ({ open: show, close: hide }), [show, hide]);
};
