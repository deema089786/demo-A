import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateServiceStatusResponse } from '@demo-A/api-types';

import { ClientApi } from '../../api';
import { USE_SERVICES_QUERY_KEY } from './services.query';

type UseUpdateServiceStatusMutationParams = {
  onSuccess?(data: UpdateServiceStatusResponse): Promise<void> | void | unknown;
};

export const useUpdateServiceStatusMutation = (
  params: UseUpdateServiceStatusMutationParams = {},
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ClientApi.updateServiceStatus,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [USE_SERVICES_QUERY_KEY],
      });
      await params.onSuccess?.(data);
    },
  });
  return { updateServiceStatus: mutate, isLoading: isPending };
};
