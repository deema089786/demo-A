import React, { useContext } from 'react';
import { JWTAccessToken } from '@demo-A/api-types';

import { Profile } from '../../profile';

export type AuthContextState = {
  profile: Profile | null;
  isProfileLoading: boolean;
  logout(): void;
  signUp(params: { accessToken: JWTAccessToken }): void;
};

const initialState: AuthContextState = {
  profile: null,
  isProfileLoading: false,
  logout: () => {
    throw new Error('Not implemented');
  },
  signUp: () => {
    throw new Error('Not implemented');
  },
};

export const AuthContext = React.createContext(initialState);
export const useAuth = () => useContext(AuthContext);

export const useProfile = (): Profile => {
  const auth = useAuth();
  if (!auth.profile) throw new Error('Profile not found');
  return auth.profile;
};
