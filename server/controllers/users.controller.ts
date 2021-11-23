import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { CreateUserDto } from 'server/dto/create_user.dto';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { RefreshToken } from 'server/entities/refresh_token.entity';
import { User } from 'server/entities/user.entity';
import { AuthGuard } from 'server/providers/guards/auth.guard';
import { JwtService } from 'server/providers/services/jwt.service';
import { RefreshTokensService } from 'server/providers/services/refresh_tokens.service';
import { UsersService } from 'server/providers/services/users.service';

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokensService,
  ) {}

  @Get('/users/me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@JwtBody() jwtBody: JwtBodyDto) {
    const user = await this.usersService.find(jwtBody.userId);
    return { user };
  }

  @Post('/users')
  async create(@Body() userPayload: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const newUser = new User();
    newUser.email = userPayload.email;
    newUser.name = userPayload.name;
    newUser.passwordHash = await bcrypt.hash(userPayload.password, 10);

    try {
      const user = await this.usersService.create(newUser);
      // create refresh token in database for user
      const newRefreshToken = new RefreshToken();
      newRefreshToken.user = user;
      const refreshToken = await this.refreshTokenService.create(newRefreshToken);

      // issue jwt and refreshJwtToken
      const token = this.jwtService.issueToken({ userId: user.id });
      const refreshJwtToken = this.jwtService.issueRefreshToken({ id: refreshToken.id, userId: user.id });

      // only refresh token should go in the cookie
      res.cookie('_refresh_token', refreshJwtToken, {
        httpOnly: true, // prevents javascript code from accessing cookie (helps protect against XSS attacks)
      });

      return { user, token };
    } catch (e) {
      throw new HttpException(`User creation failed. ${e.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
