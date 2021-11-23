import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { config } from './database/config';
import { UsersModule } from './modules/users.module';
import { JwtService } from './providers/services/jwt.service';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule],
  controllers: [AppController],
  providers: [JwtService],
})
export class AppModule {}
