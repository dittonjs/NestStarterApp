import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '../services/jwt.service';
import { GuardUtil } from '../util/guard.util';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  constructor(private guardUtil: GuardUtil, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    // Handlers and Controllers can both skip this guard in the event that
    if (this.guardUtil.shouldSkip(this, context)) {
      return true;
    }

    const req = context.switchToHttp().getRequest() as Socket;
    const jwt = req.handshake.auth.token;
    if (!jwt) throw new WsException('Invalid auth token');
    try {
      req.handshake.auth.jwtBody = this.jwtService.parseToken(jwt);
    } catch (e) {
      throw new WsException('Invalid auth token');
    }
    return true;
  }
}
