import {Module} from '@nestjs/common'
import {AnecdoteScrapperController} from "./anecdote.scrapper.controller";
import {AnecdoteScrapperService} from "./anecdote.scrapper.service";
import {AnecdoteRepository} from "../anecdote/repositores/anecdote.repository";
import {Anecdote} from "../anecdote/entities/anecdote.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports:[TypeOrmModule.forFeature([Anecdote])],
    controllers:[AnecdoteScrapperController],
    providers:[AnecdoteScrapperService, AnecdoteRepository],
})
export class AnecdoteScrapperModule{};