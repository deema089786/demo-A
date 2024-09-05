import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ClientApi } from '../../api';
import { Service } from '../services.types';
import { mapApiServiceToService } from '../services.dto';

export const USE_SERVICES_QUERY_KEY = 'services-query' as const;

export const useServicesQuery = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: [USE_SERVICES_QUERY_KEY],
    queryFn: ClientApi.getServices,
  });

  const services = useMemo<Service[]>(
    () => (data ? data.services.map(mapApiServiceToService) : []),
    [data],
  );

  return { services, isLoading: isPending, refetch };
};
