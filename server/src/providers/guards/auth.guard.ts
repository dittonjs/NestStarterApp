import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '../services/jwt.service';
import { GuardUtil } from '../util/guard.util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private guardUtil: GuardUtil, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    // Handlers and Controllers can both skip this guard in the event that
    if (this.guardUtil.shouldSkip(this, context)) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const jwt = authHeader.split(' ')[1];
    try {
      req.jwtBody = this.jwtService.parseToken(jwt);
    } catch (e) {
      return false;
    }

    return true;
  }
}
