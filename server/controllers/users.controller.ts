import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { Roles } from 'server/decorators/roles.decorator';
import { Skip } from 'server/decorators/skip.decorator';
import { CreateUserDto } from 'server/dto/create_user.dto';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { RefreshToken } from 'server/entities/refresh_token.entity';
import { RoleKey } from 'server/entities/role.entity';
import { User } from 'server/entities/user.entity';
import { UserRole } from 'server/entities/user_role.entity';
import { AuthGuard } from 'server/providers/guards/auth.guard';
import { JwtService } from 'server/providers/services/jwt.service';
import { RefreshTokensService } from 'server/providers/services/refresh_tokens.service';
import { RolesService } from 'server/providers/services/roles.service';
import { UsersService } from 'server/providers/services/users.service';

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokensService,
  ) {}

  @Get('/users')
  @Roles(RoleKey.ADMIN)
  async index() {
    const users = await this.usersService.findAll();
    return { users };
  }

  @Get('/users/me')
  async getCurrentUser(@JwtBody() jwtBody: JwtBodyDto) {
    const user = await this.usersService.find(jwtBody.userId);
    return { user };
  }

  @Post('/users')
  @Skip(AuthGuard)
  async create(@Body() userPayload: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const newUser = new User();
    newUser.email = userPayload.email;
    newUser.firstName = userPayload.firstName;
    newUser.lastName = userPayload.lastName;
    newUser.passwordHash = await bcrypt.hash(userPayload.password, 10);
    const [role] = await this.rolesService.findByKey(RoleKey.USER);
    const userRole = new UserRole();
    userRole.role = role;
    newUser.userRoles = [userRole];

    try {
      const user = await this.usersService.create(newUser);
      // create refresh token in database for user
      const newRefreshToken = new RefreshToken();
      newRefreshToken.user = user;
      const refreshToken = await this.refreshTokenService.create(newRefreshToken);
      // issue jwt and refreshJwtToken
      // note the roles hard coded to just USER.
      // If you want to allow users to sign up as different roles then
      // you will need to update this here.
      const token = this.jwtService.issueToken({ userId: user.id, roles: [RoleKey.USER] });
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
