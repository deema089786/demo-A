import { UpdateServicePayload } from '@demo-A/api-types';

export type EditModalProps = {
  initialValues: UpdateServicePayload;
  imageSrc: string | null;
  onSubmit(params: {
    values: UpdateServicePayload;
    media: { image: File | null };
  }): Promise<void>;

  onCancel?(): void;
  onClosed?(): void;
};
