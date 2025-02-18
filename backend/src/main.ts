import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as hbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
      'hbs',
      hbs.engine({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: join(__dirname, '..', 'views', 'layouts'),
        partialsDir: join(__dirname, '..', 'views', 'partials'),
      }),
  );
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
