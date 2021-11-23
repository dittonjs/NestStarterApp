import { Body, Controller, Delete, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'server/providers/services/users.service';
import { SignInDto } from 'server/dto/sign_in.dto';
import { JwtService } from 'server/providers/services/jwt.service';
import { RefreshTokensService } from 'server/providers/services/refresh_tokens.service';
import { RefreshToken } from 'server/entities/refresh_token.entity';

// this is kind of a misnomer because we are doing token based auth
// instead of session based auth
@Controller()
export class SessionsController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokensService,
  ) {}

  @Post('/sessions')
  async create(@Body() body: SignInDto, @Res({ passthrough: true }) res: Response) {
    const { verified, user } = await this.usersService.verify(body.email, body.password);

    if (!verified) {
      throw new HttpException('Invalid email or password.', HttpStatus.BAD_REQUEST);
    }

    let refreshToken = user.refreshTokens[0];
    if (!refreshToken) {
      const newRefreshToken = new RefreshToken();
      newRefreshToken.user = user;
      refreshToken = await this.refreshTokenService.create(newRefreshToken);
      // generate new refresh token
    }

    // JWT gets sent with response
    const token = this.jwtService.issueToken({ userId: user.id });

    const refreshJwtToken = this.jwtService.issueRefreshToken({ id: refreshToken.id, userId: user.id });

    // only refresh token should go in the cookie
    res.cookie('_refresh_token', refreshJwtToken, {
      httpOnly: true, // prevents javascript code from accessing cookie (helps protect against XSS attacks)
    });

    return { token };
  }

  @Delete('/sessions')
  async destroy(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('_refresh_token');
    return { success: true };
  }
}
