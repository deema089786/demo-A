import { useMutation } from '@tanstack/react-query';
import { AuthSignUpByGoogleTokenResponse } from '@demo-A/api-types';

import { ClientApi } from '../../api';

type UseSignUpByGoogleMutationParams = {
  onSuccess?(data: AuthSignUpByGoogleTokenResponse): Promise<void>;
};

export const useSignUpByGoogleMutation = (
  params: UseSignUpByGoogleMutationParams = {},
) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ClientApi.authSighUpByGoogleToken,
    onSuccess: params.onSuccess,
  });
  return { signUpByGoogle: mutate, isLoading: isPending };
};
