import './env';
import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

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
    logger: ['verbose'],
  });

  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setBaseViewsDir(join(__dirname, '../', 'views'));
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT);
}
bootstrap();
