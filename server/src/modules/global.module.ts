import { Global, Module } from "@nestjs/common";
import { JwtService } from "src/providers/services/jwt.service";
import { PrismaService } from "src/providers/services/prisma.service";

@Global()
@Module({
  controllers: [],
  providers: [JwtService, PrismaService],
  exports: [JwtService, PrismaService],
})
export class GlobalModule {}
