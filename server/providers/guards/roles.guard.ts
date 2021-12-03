import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_CONTEXT_KEY } from 'server/decorators/roles.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { RoleKey } from 'server/entities/role.entity';
import { RolesService } from '../services/roles.service';
import { UsersService } from '../services/users.service';
import { intersection, isEmpty } from 'lodash';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private usersService: UsersService, private rolesService: RolesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleKey[]>(ROLES_CONTEXT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const jwtBody: JwtBodyDto = context.switchToHttp().getRequest().jwtBody;

    if (!jwtBody) return false; // unauthenticated users are not authorized

    return !isEmpty(intersection(jwtBody.roles, requiredRoles));
  }
}
