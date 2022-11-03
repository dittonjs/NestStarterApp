import { Controller, Get, HttpException, Req } from "@nestjs/common";
import { Request } from "express";
import { RefreshTokenBody } from "src/dto/refresh_token_body.dto";
import { JwtService } from "src/providers/services/jwt.service";
import { Skip } from "src/decorators/skip.decorator";
import { AuthGuard } from "src/providers/guards/auth.guard";
import { PrismaService } from "src/providers/services/prisma.service";

// this is kind of a misnomer because we are doing token based auth
// instead of session based auth
@Controller()
export class RefreshTokensController {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  @Get("/refresh_token")
  @Skip(AuthGuard)
  async get(@Req() req: Request) {
    const refreshToken: string = req.cookies["_refresh_token"];
    if (!refreshToken) {
      throw new HttpException("No refresh token present", 401);
    }

    const tokenBody = this.jwtService.parseRefreshToken(
      refreshToken
    ) as RefreshTokenBody;

    const user = await this.prisma.user.findUnique({
      where: { id: tokenBody.userId },
      include: {
        refreshTokens: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    const userRefreshToken = user.refreshTokens.find(
      (t) => t.id === tokenBody.id
    );
    if (!userRefreshToken) {
      throw new HttpException("User refresh token not found", 401);
    }

    const token = this.jwtService.issueToken({
      userId: user.id,
      roles: user.userRoles.map((r) => r.role.roleKey),
    });
    return { token };
  }
}
