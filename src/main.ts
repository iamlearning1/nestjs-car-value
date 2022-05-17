import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
const cookieSession = require('cookie-session');

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieSession({ keys: ['ld37fdkldQEVGREFDG8dfshold3$##'] }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
