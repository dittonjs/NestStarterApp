import { Module } from "@nestjs/common";
import { SessionsController } from "../controllers/sessions.controller";
import { UsersController } from "src/controllers/users.controller";
import { RefreshTokensController } from "src/controllers/refresh_tokens.controller";

@Module({
  controllers: [SessionsController, UsersController, RefreshTokensController],
})
export class UsersModule {}
