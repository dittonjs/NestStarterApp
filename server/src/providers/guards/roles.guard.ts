import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_CONTEXT_KEY } from "src/decorators/roles.decorator";
import { JwtBodyDto } from "src/dto/jwt_body.dto";
import { RoleKey } from "@prisma/client";
import { intersection, isEmpty } from "lodash";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleKey[]>(
      ROLES_CONTEXT_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      return true;
    }

    const jwtBody: JwtBodyDto = context.switchToHttp().getRequest().jwtBody;

    if (!jwtBody) return false; // unauthenticated users are not authorized

    return !isEmpty(intersection(jwtBody.roles, requiredRoles));
  }
}
