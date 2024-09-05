import { SetMetadata } from '@nestjs/common';

export const RBAC_KEY = 'rbac_role';
export const RBAC = <RoleTypeOrEnum>(...roles: RoleTypeOrEnum[]) => {
  return SetMetadata(RBAC_KEY, roles);
};
