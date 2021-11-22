import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  index(@Req() req: Request) {
    const jwt = req.cookies['_token'];
    return { jwt };
  }
}
