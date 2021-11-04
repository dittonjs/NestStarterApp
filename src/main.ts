import { config } from 'dotenv';
import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

config();

async function bootstrap() {
  let httpsOptions;
  if (process.env.NODE_ENV === 'development') {
    httpsOptions = {
      key: fs.readFileSync('./private-key.pem'),
      cert: fs.readFileSync('./public-cert.pem'),
    }
  }
  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });
  await app.listen(process.env.PORT);
}
bootstrap();
