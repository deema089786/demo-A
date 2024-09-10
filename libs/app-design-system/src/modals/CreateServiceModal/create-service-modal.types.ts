import { CreateServicePayload } from '@demo-A/api-types';

export type CreateModalProps = {
  initialVariant: 'banner' | 'default';
  onSubmit(params: {
    values: CreateServicePayload;
    media: { image: File };
  }): Promise<void>;
  onPreview(params: {
    values: CreateServicePayload;
    media: { imageSrc: string };
  }): void;

  onCancel?(): void;
  onClosed?(): void;
};
