export type ConfirmationModalProps = {
  title: string;
  description?: string;

  confirmButtonText?: string;
  cancelButtonText?: string;
  cancelOnClickOutsideDisabled?: boolean;

  onConfirm(): void;
  onCancel?(): void;
  onClosed?(): void;
};
