import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'server/providers/services/users.service';
import { SignInDto } from 'server/dto/sign_in.dto';


// this is kind of a misnomer because we are doing token based auth
// instead of session based auth
@Controller()
export class SessionsController {
  constructor(private usersService: UsersService) {}

  @Post('/sign_in')
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { verified, user } = await this.usersService.verify(
      body.username,
      body.password,
    );

    if (!verified) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Write JWT to cookie and send with response.
    const token = jwt.sign(
      {
        user_id: user.id,
      },
      process.env.ENCRYPTION_KEY,
      { expiresIn: '1h' },
    );
    res.cookie('_token', token);
    return { token };
  }
}
