import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateServiceResponse } from '@demo-A/api-types';

import { ClientApi } from '../../api';
import { USE_SERVICES_QUERY_KEY } from './services.query';

type UseUpdateServiceMutationParams = {
  onSuccess?(data: UpdateServiceResponse): Promise<void> | void | unknown;
};

export const useUpdateServiceMutation = (
  params: UseUpdateServiceMutationParams = {},
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ClientApi.updateService,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [USE_SERVICES_QUERY_KEY],
      });
      await params.onSuccess?.(data);
    },
  });
  return { updateService: mutate, isLoading: isPending };
};
