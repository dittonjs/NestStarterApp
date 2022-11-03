import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { SignInDto } from "src/dto/sign_in.dto";
import { JwtService } from "src/providers/services/jwt.service";
import { Skip } from "src/decorators/skip.decorator";
import { AuthGuard } from "src/providers/guards/auth.guard";
import { JwtBody } from "src/decorators/jwt_body.decorator";
import { JwtBodyDto } from "src/dto/jwt_body.dto";
import { PrismaService } from "src/providers/services/prisma.service";
import * as bcrypt from "bcrypt";

// this is kind of a misnomer because we are doing token based auth
// instead of session based auth
@Controller()
export class SessionsController {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  @Post("/sessions")
  @Skip(AuthGuard)
  async create(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { email, password } = body;
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        refreshTokens: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new HttpException(
        "Invalid email or password.",
        HttpStatus.BAD_REQUEST
      );
    }

    const verified: boolean = await bcrypt.compare(password, user.passwordHash);

    if (!verified) {
      throw new HttpException(
        "Invalid email or password.",
        HttpStatus.BAD_REQUEST
      );
    }

    let refreshToken = user.refreshTokens[0];
    if (!refreshToken) {
      refreshToken = await this.prisma.refreshToken.create({
        data: {
          userId: user.id,
        },
      });
      // generate new refresh token
    }

    // JWT gets sent with response
    const token = this.jwtService.issueToken({
      userId: user.id,
      roles: user.userRoles.map((r) => r.role.roleKey),
    });

    const refreshJwtToken = this.jwtService.issueRefreshToken({
      id: refreshToken.id,
      userId: user.id,
    });

    // only refresh token should go in the cookie
    res.cookie("_refresh_token", refreshJwtToken, {
      httpOnly: true, // prevents javascript code from accessing cookie (helps protect against XSS attacks)
    });

    return { token };
  }

  @Delete("/sessions")
  async destroy(
    @Res({ passthrough: true }) res: Response,
    @JwtBody() jwtBody: JwtBodyDto
  ) {
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId: jwtBody.userId,
      },
    });

    res.clearCookie("_refresh_token");
    return { success: true };
  }
}
