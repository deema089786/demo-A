import { AuthCreatePasswordPayload } from '@demo-A/api-types';

export type CreatePasswordFormProps = {
  onSubmit(payload: AuthCreatePasswordPayload): void;
  isLoading: boolean;
};
