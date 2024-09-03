import { useMutation } from '@tanstack/react-query';
import { AuthSignUpByCredentialsResponse } from '@demo-A/api-types';

import { ClientApi } from '../../api';

type UseSignUpByCredentialsMutationParams = {
  onSuccess?(data: AuthSignUpByCredentialsResponse): Promise<void>;
};

export const useSignUpByCredentialsMutation = (
  params: UseSignUpByCredentialsMutationParams = {},
) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ClientApi.authSighUpByCredentials,
    onSuccess: params.onSuccess,
  });
  return { signUpByCredentials: mutate, isLoading: isPending };
};
