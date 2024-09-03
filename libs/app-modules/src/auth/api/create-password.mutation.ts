import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthCreatePasswordResponse } from '@demo-A/api-types';

import { USE_PROFILE_QUERY_KEY } from './profile.query';
import { ClientApi } from '../../api';

type UseCreatePasswordMutationParams = {
  onSuccess?(data: AuthCreatePasswordResponse): Promise<void>;
};

export const useCreatePasswordMutation = (
  params: UseCreatePasswordMutationParams = {},
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ClientApi.authCreatePassword,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [USE_PROFILE_QUERY_KEY],
      });
      await params.onSuccess?.(data);
    },
  });
  return { createPassword: mutate, isLoading: isPending };
};
