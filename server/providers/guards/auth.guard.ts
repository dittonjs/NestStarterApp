import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const jwt = authHeader.split(' ')[1];
    try {
      req.jwtBody = this.jwtService.parseToken(jwt);
    } catch (e) {
      return false;
    }

    return true;
  }
}
