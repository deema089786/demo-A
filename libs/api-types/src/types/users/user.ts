import { Timestamp } from '../base';
import { UserProfile } from './user-profile';

export interface User extends Timestamp {
  id: string;

  phoneNumber: string | null;
  email: string | null;
  password: string | null;

  profile: UserProfile | null;
}

export interface UserWithProfile extends User {
  profile: UserProfile;
}
