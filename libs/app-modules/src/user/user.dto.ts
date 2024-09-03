import { AuthProfileResponse } from '@demo-A/api-types';

import { Profile } from './user.types';

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
  };
};
