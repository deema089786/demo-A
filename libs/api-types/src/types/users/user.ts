import { Timestamp } from '../base';
import { UserProfile } from './user-profile';

export type UserRole = 'admin' | 'user';

export interface User extends Timestamp {
  id: string;

  phoneNumber: string | null;
  email: string | null;
  password: string | null;

  profile: UserProfile | null;

  role: UserRole;
}

export interface UserWithProfile extends User {
  profile: UserProfile;
}
