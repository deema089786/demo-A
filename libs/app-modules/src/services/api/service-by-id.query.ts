import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ClientApi } from '../../api';
import { Service } from '../services.types';
import { mapApiServiceToService } from '../services.dto';

export const USE_SERVICE_BY_ID_QUERY_KEY = 'service-by-id-query' as const;

type UseServiceByIdQueryParams = {
  id: string;
};

export const useServiceByIdQuery = (params: UseServiceByIdQueryParams) => {
  const { data, isPending, refetch } = useQuery({
    queryKey: [USE_SERVICE_BY_ID_QUERY_KEY],
    queryFn: () => ClientApi.getServiceById({ id: params.id }),
  });

  const service = useMemo<Service | null>(
    () => (data?.service ? mapApiServiceToService(data.service) : null),
    [data],
  );

  return { service, isLoading: isPending, refetch };
};
