import {Module} from '@nestjs/common'
import {AnecdoteService} from "./anecdote.service";
import {AnecdoteController} from "./anecdote.controller";
import {AuthModule} from "../auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Anecdote} from "./entities/anecdote.entity";
import {AnecdoteRepository} from "./repositores/anecdote.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Anecdote])
        ,AuthModule],
    providers:[AnecdoteService,AnecdoteRepository],
    controllers:[AnecdoteController],
})
export class AnecdoteModule {}