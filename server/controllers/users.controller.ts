import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from 'server/dto/create_user.dto';
import { User } from 'server/entities/user.entity';
import { UsersService } from 'server/providers/services/users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/users')
  async create(
    @Body() userPayload: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const newUser = new User();
    newUser.email = userPayload.email;
    newUser.name = userPayload.name;
    newUser.password_hash = await bcrypt.hash(userPayload.password, 10);

    try {
      const user = await this.usersService.create(newUser);
      // assume signup and write cookie
      // Write JWT to cookie and send with response.
      const token = jwt.sign(
        {
          user_id: user.id,
        },
        process.env.ENCRYPTION_KEY,
        { expiresIn: '1h' },
      );
      res.cookie('_token', token);
      return { user, token };
    } catch (e) {
      throw new HttpException(
        `User creation failed. ${e.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
