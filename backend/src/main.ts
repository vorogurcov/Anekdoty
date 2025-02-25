import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'express-handlebars';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const corsOptions = {
        origin: "http://localhost:8080",
        methods: "GET,POST,OPTIONS", // Allow specific methods
        allowedHeaders: "Content-Type",// Allow specific headers
        credentials:true,
    };
    app.enableCors(corsOptions);


    app.use(cookieParser());

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
