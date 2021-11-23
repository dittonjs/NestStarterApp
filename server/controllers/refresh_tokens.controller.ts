import { Body, Controller, Get, HttpException, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'server/providers/services/users.service';
import { SignInDto } from 'server/dto/sign_in.dto';
import { RefreshTokenBody } from 'server/dto/refresh_token_body.dto';
import { JwtService } from 'server/providers/services/jwt.service';

// this is kind of a misnomer because we are doing token based auth
// instead of session based auth
@Controller()
export class RefreshTokensController {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  @Get('/refresh_token')
  async get(@Body() body: SignInDto, @Req() req: Request) {
    const refreshToken: string = req.cookies['_refresh_token'];
    if (!refreshToken) {
      throw new HttpException('No refresh token present', 401);
    }

    const tokenBody = this.jwtService.parseRefreshToken(refreshToken) as RefreshTokenBody;

    const user = await this.usersService.find(tokenBody.userId, ['refreshTokens']);
    const userRefreshToken = user.refreshTokens.find((t) => t.id === tokenBody.id);
    if (!userRefreshToken) {
      throw new HttpException('User refresh token not found', 401);
    }

    const token = this.jwtService.issueToken({ userId: user.id });
    return { token };
  }
}
