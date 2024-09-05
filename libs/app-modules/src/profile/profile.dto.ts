import { AuthProfileResponse } from '@demo-A/api-types';

import { Profile } from './profile.types';

export const mapAuthProfileResponseToProfile = (
  data: AuthProfileResponse,
): Profile => {
  const fullName =
    [data.firstName, data.lastName].filter(Boolean).join(' ') || null;
  return {
    id: data.id,
    email: data.email,
    image: data.image,
    firstName: data.firstName,
    lastName: data.lastName,
    fullName,
    isPasswordCreated: data.isPasswordCreated,
    isEditModeEnabled: data.role === 'admin',
    supabase: data.supabase,
  };
};
