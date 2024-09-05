import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClsService } from 'nestjs-cls';
import { UsersRepository } from '@demo-A/api-modules';
import { UserRole } from '@demo-A/api-types';

export const ALLOWED_ROLES_KEY = 'allowed_roles';
// Decorator
export const AllowedRoles = (...roles: UserRole[]) => {
  return SetMetadata(ALLOWED_ROLES_KEY, roles);
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private cls: ClsService,
    private usersRepository: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<UserRole[]>(
      ALLOWED_ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return false;
    }
    const _user = this.cls.get('user');
    if (!_user) return false;
    const user = await this.usersRepository.getUserById(_user.id);
    if (!user) return false;

    return requiredRoles.includes(user.role);
  }
}
