import { Controller, Get, Render } from '@nestjs/common';
import { Skip } from './decorators/skip.decorator';
import { AuthGuard } from './providers/guards/auth.guard';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  @Skip(AuthGuard)
  index() {}
}
