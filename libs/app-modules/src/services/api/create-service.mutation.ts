import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateServiceResponse } from '@demo-A/api-types';

import { ClientApi } from '../../api';
import { USE_SERVICES_QUERY_KEY } from './services.query';

type UseCreateServiceMutationParams = {
  onSuccess?(data: CreateServiceResponse): Promise<void> | void | unknown;
};

export const useCreateServiceMutation = (
  params: UseCreateServiceMutationParams = {},
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ClientApi.createService,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [USE_SERVICES_QUERY_KEY],
      });
      await params.onSuccess?.(data);
    },
  });
  return { createService: mutate, isLoading: isPending };
};
