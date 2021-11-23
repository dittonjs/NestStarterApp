import { HttpException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { RefreshTokenBody } from 'server/dto/refresh_token_body.dto';

@Injectable()
export class JwtService {
  issueToken(body: JwtBodyDto | RefreshTokenBody, expiresIn = '15m', key = process.env.ENCRYPTION_KEY): string {
    return jwt.sign(body, key, { expiresIn });
  }

  issueRefreshToken(body: RefreshTokenBody) {
    return this.issueToken(body, '1y', process.env.REFRESH_ENCRYPTION_KEY);
  }

  parseToken(token: string, key = process.env.ENCRYPTION_KEY): JwtBodyDto | RefreshTokenBody {
    try {
      return jwt.verify(token, key);
    } catch (e) {
      throw new HttpException('Invalid jwt token', 401);
    }
  }

  parseRefreshToken(token: string) {
    return this.parseToken(token, process.env.REFRESH_ENCRYPTION_KEY);
  }
}
