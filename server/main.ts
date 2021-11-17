import './env';
import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  let httpsOptions;
  if (process.env.NODE_ENV === 'development') {
    httpsOptions = {
      key: fs.readFileSync('./private-key.pem'),
      cert: fs.readFileSync('./public-cert.pem'),
    };
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  app.use(morgan('tiny'));
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setBaseViewsDir(join(__dirname, '../', 'views'));
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT);
}
bootstrap();
