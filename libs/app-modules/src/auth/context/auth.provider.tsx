import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { JWTAccessToken } from '@demo-A/api-types';

import { AuthContext, AuthContextState } from './auth.context';
import { useProfileQuery } from '../api';

export const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { profile, refetch, isLoading: isProfileLoading } = useProfileQuery();

  const logout = useCallback<AuthContextState['logout']>(() => {
    localStorage.removeItem('accessToken');
    refetch().catch(console.error);
  }, [refetch]);

  const signUp = useCallback<AuthContextState['signUp']>(
    (params: { accessToken: JWTAccessToken }) => {
      localStorage.setItem('accessToken', params.accessToken);
      refetch().catch(console.error);
    },
    [refetch],
  );

  const contentValue = useMemo<AuthContextState>(
    () => ({
      profile,
      isProfileLoading,
      logout,
      signUp,
    }),
    [logout, profile, signUp, isProfileLoading],
  );

  return (
    <AuthContext.Provider value={contentValue}>{children}</AuthContext.Provider>
  );
};
