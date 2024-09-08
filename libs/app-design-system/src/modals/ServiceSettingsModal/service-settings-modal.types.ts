export type ServiceSettingsModalProps = {
  serviceStatus: 'active' | 'draft' | 'archived';
  serviceTitle: string;
  onServiceDelete(): void;
  onServiceEdit(): void;
  onServiceArchive(): void;
  onServicePublish(): void;
  onClosed?(): void;
};
