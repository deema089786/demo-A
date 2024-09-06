import { CreateServicePayload } from '@demo-A/api-types';

export type ConfirmationModalProps = {
  initialVariant: 'banner' | 'default';
  onSubmit(params: {
    values: CreateServicePayload;
    media: { image: File };
    modalActions: { hide(): void };
  }): Promise<void>;

  onCreated(): void;
  onCancel?(): void;
  onClosed?(): void;
};
