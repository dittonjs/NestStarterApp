import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { JwtBody } from "src/decorators/jwt_body.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Skip } from "src/decorators/skip.decorator";
import { CreateUserDto } from "src/dto/create_user.dto";
import { JwtBodyDto } from "src/dto/jwt_body.dto";
import { AuthGuard } from "src/providers/guards/auth.guard";
import { JwtService } from "src/providers/services/jwt.service";
import { PrismaService } from "src/providers/services/prisma.service";
import { RoleKey } from "@prisma/client";

@Controller()
export class UsersController {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  @Get("/users")
  @Roles(RoleKey.ADMIN)
  async index() {
    const users = await this.prisma.user.findMany();
    return { users };
  }

  @Get("/users/me")
  async getCurrentUser(@JwtBody() jwtBody: JwtBodyDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: jwtBody.userId },
    });
    return { user };
  }

  @Post("/users")
  @Skip(AuthGuard)
  async create(
    @Body() userPayload: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const role = await this.prisma.role.findUnique({
      where: { roleKey: RoleKey.USER },
    });
    try {
      const user = await this.prisma.user.create({
        data: {
          email: userPayload.email,
          firstName: userPayload.firstName,
          lastName: userPayload.lastName,
          passwordHash: await bcrypt.hash(userPayload.password, 10),
          userRoles: {
            create: {
              roleId: role.id,
              contextId: "SITE",
            },
          },
          refreshTokens: {
            create: {},
          },
        },
        include: {
          refreshTokens: true,
        },
      });

      const token = this.jwtService.issueToken({
        userId: user.id,
        roles: [RoleKey.USER],
      });
      const refreshJwtToken = this.jwtService.issueRefreshToken({
        id: user.refreshTokens[0].id,
        userId: user.id,
      });

      // only refresh token should go in the cookie
      res.cookie("_refresh_token", refreshJwtToken, {
        httpOnly: true, // prevents javascript code from accessing cookie (helps protect against XSS attacks)
      });

      return { user, token };
    } catch (e) {
      throw new HttpException(
        `User creation failed. ${e.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
