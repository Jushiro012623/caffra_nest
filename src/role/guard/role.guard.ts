import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@app/role/decorators/roles.decorator';
import { RoleEnum } from '@app/role/enums/role.enum';
import { LoggerService } from '@app/common/logger/logger.service';
import type { AuthRequest } from '@app/common/types/request.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private logger: LoggerService,
  ) {
    this.logger.setContext(RolesGuard.name);
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<AuthRequest>();

    const roles: RoleEnum[] = request.user.roles ?? ([] as RoleEnum[]);

    const hasRequiredRole: boolean = requiredRoles.some(
      (role: RoleEnum): boolean => roles.includes(role),
    );

    if (!hasRequiredRole) {
      this.logger.warn('ROLE_GUARD_ACTION_FORBIDDEN', {
        id: request.user.sub,
        roles: roles.join(','),
      });
      throw new ForbiddenException('Forbidden resource');
    }

    return true;
  }
}
