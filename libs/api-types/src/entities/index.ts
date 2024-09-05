// region User
export * from './user.entity';
import { UserEntity } from './user.entity';
export * from './user-profile.entity';
import { UserProfileEntity } from './user-profile.entity';
export * from './service.entity';
import { ServiceEntity } from './service.entity';
// endregion

export const entitiesArray = [
  // region User
  UserEntity,
  UserProfileEntity,
  // endregion
  // region Service
  ServiceEntity,
  // endregion
];
