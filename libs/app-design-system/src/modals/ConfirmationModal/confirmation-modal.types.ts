export type ConfirmationModalProps = {
  title: string;
  description?: string;

  confirmButtonText?: string;
  cancelButtonText?: string;

  onConfirm?(): void;
  onCancel?(): void;
  onClosed?(): void;
};

export type ConfirmationModalResolves = {
  confirmed: boolean;
};
