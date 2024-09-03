import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ClientApi } from '../../api';
import { mapAuthProfileResponseToProfile } from '../user.dto';
import { Profile } from '../user.types';

const USE_PROFILE_QUERY_KEY = 'profile-query' as const;

export const useProfileQuery = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [USE_PROFILE_QUERY_KEY],
    queryFn: ClientApi.authGetProfile,
  });

  const profile = useMemo<Profile | null>(
    () => (data && !isError ? mapAuthProfileResponseToProfile(data) : null),
    [data, isError],
  );

  return { profile, isLoading: isPending, refetch };
};
