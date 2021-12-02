import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '../services/jwt.service';
import { SKIP_KEY } from 'server/decorators/skip.decorator';
import { Reflector } from '@nestjs/core';
import { Class } from 'server/dto/class.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const skippedGuards = this.reflector.getAllAndOverride<Class<CanActivate>[]>(SKIP_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skippedGuards) {
      const skippedGuard = skippedGuards.find((guard) => this instanceof guard);
      if (skippedGuard) {
        return true;
      }
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
