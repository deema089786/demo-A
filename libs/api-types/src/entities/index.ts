// region User
export * from './user.entity';
import { UserEntity } from './user.entity';
export * from './user-profile.entity';
import { UserProfileEntity } from './user-profile.entity';
// endregion

export const entitiesArray = [
  // region User
  UserEntity,
  UserProfileEntity,
  // endregion
];
