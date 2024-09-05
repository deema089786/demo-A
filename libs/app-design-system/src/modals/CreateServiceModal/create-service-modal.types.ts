export type ConfirmationModalProps = {
  initialVariant: 'banner' | 'default';

  onCreated(): void;
  onCancel?(): void;
  onClosed?(): void;
};
