import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from 'server/providers/services/users.service';
import { SignInDto } from '../dto/sign_in.dto';
import { Response } from 'express';
// this is kind of a misnomer because we are doing token based auth
// instead of session based auth
@Controller()
export class SessionsController {
  constructor(private usersService: UsersService) {}

  @Post('/sign_in')
  async signIn(@Body() body: SignInDto, @Res() res: Response) {
    console.log("DO I GET RAN?")
    const verified = await this.usersService.verify(
      body.username,
      body.password,
    );

    if (!verified) {
      res.status(400);
      console.log("here too??")
      res.json({ message: 'Invalid email or password' });
      return;
    }
    res.json({ success: true });
  }
}
