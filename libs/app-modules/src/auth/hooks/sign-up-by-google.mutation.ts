import { useMutation } from '@tanstack/react-query';

import { ClientApi } from '../../api';

export const useSignUpByGoogleMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ClientApi.authSighUpByGoogleToken,
  });
  return { signUpByGoogle: mutate, isLoading: isPending };
};
