import './env';
import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  let httpsOptions;
  if (process.env.USE_SSL === 'true') {
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
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  const logger = new Logger('Request');
  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => logger.log(message.replace('\n', '')),
      },
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
