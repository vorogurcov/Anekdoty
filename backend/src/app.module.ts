import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./auth/entities/user.entity";
import {AnecdoteModule} from "./anecdote/anecdote.module";
import {Anecdote} from "./anecdote/entities/anecdote.entity";
import {AnecdoteScrapperModule} from "./anecdoteScrapper/anecdote.scrapper.module";


@Module({
  imports: [TypeOrmModule.forRoot({
    host:process.env.DB_HOST,
    type:process.env.DB_PROVIDER as ('postgres' | 'mongodb'),
    port:Number(process.env.DB_PORT) ?? 5432,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    synchronize:true,
    entities:[User, Anecdote]
  }),
    AuthModule,
  AnecdoteModule,
  AnecdoteScrapperModule],
})
export class AppModule {}