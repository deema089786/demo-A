import { useMutation } from '@tanstack/react-query';

import { ClientApi } from '../../api';

export const useSignUpByCredentialsMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ClientApi.authSighUpByCredentials,
  });
  return { signUpByCredentials: mutate, isLoading: isPending };
};
