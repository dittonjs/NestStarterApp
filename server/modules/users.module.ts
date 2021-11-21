import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'server/entities/user.entity';
import { SessionsController } from '../controllers/sessions.controller';
import { UsersController } from 'server/controllers/users.controller';
import { UsersService } from '../providers/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SessionsController, UsersController],
  providers: [UsersService],
})
export class UsersModule {}
