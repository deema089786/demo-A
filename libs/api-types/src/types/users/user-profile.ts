import { z } from 'zod';

import { Timestamp } from '../base';
import { User } from './user';

export interface UserProfile extends Timestamp {
  id: string;

  firstName: string | null;
  lastName: string | null;
  image: string | null;

  userId: string;
  user: User | null;
}

export const updateProfilePayloadSchema = z.object({
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
});

export type UpdateProfilePayload = z.infer<typeof updateProfilePayloadSchema>;

export type UpdateProfileResponse = {
  success: boolean;
};
