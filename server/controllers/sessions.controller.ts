import { Body, Controller, Delete, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'server/providers/services/users.service';
import { SignInDto } from 'server/dto/sign_in.dto';
import { JwtService } from 'server/providers/services/jwt.service';
import { RefreshTokensService } from 'server/providers/services/refresh_tokens.service';
import { RefreshToken } from 'server/entities/refresh_token.entity';
import { Skip } from 'server/decorators/skip.decorator';
import { AuthGuard } from 'server/providers/guards/auth.guard';
import { RolesService } from 'server/providers/services/roles.service';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';

// this is kind of a misnomer because we are doing token based auth
// instead of session based auth
@Controller()
export class SessionsController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
    private refreshTokenService: RefreshTokensService,
  ) {}

  @Post('/sessions')
  @Skip(AuthGuard)
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

    const userRoles = await this.rolesService.findByIds(user.userRoles.map((ur) => ur.roleId));

    // JWT gets sent with response
    const token = this.jwtService.issueToken({ userId: user.id, roles: userRoles.map((r) => r.key) });

    const refreshJwtToken = this.jwtService.issueRefreshToken({ id: refreshToken.id, userId: user.id });

    // only refresh token should go in the cookie
    res.cookie('_refresh_token', refreshJwtToken, {
      httpOnly: true, // prevents javascript code from accessing cookie (helps protect against XSS attacks)
    });

    return { token };
  }

  @Delete('/sessions')
  async destroy(@Res({ passthrough: true }) res: Response, @JwtBody() jwtBody: JwtBodyDto) {
    const user = await this.usersService.find(jwtBody.userId, ['refreshTokens']);
    await this.refreshTokenService.destroy(...user.refreshTokens);
    res.clearCookie('_refresh_token');
    return { success: true };
  }
}
