import {
    Body,
    Controller,
    Post,
    Query,
    Req,
     UseGuards
} from '@nestjs/common'
import {AnecdoteService} from "./anecdote.service";
import {Request, Response} from 'express'
import {AuthGuard} from "@nestjs/passport";
import {AnecdoteFilterDto} from "./dto/anecdote-filter.dto";
import {User} from "../auth/entities/user.entity";
import {CreateAnecdoteDto} from "./dto/create-anecdote.dto";
import {SearchAnecdoteByTextDto} from "./dto/search-anecdote-by-text.dto";

@Controller()
@UseGuards(AuthGuard('jwt'))
export class AnecdoteController {
    constructor(private readonly anecdoteService:AnecdoteService) {}

    @Post('search')
    async searchAnecdotes(@Query() anecdoteFilterDto:AnecdoteFilterDto){
        return await this.anecdoteService.searchAnecdotes(anecdoteFilterDto);
    }

    @Post('user/search')
    async searchUserAnecdotes(@Req() req:Request,@Query() anecdoteFilterDto:AnecdoteFilterDto) {
        try {
            return await this.anecdoteService.searchAnecdotes(
                anecdoteFilterDto,
                req.user as User
            );
        } catch (error: any) {
            console.log("Failed to search user anecdotes:",error.message);
            throw error;
        }
    }
    @Post('user/save')
    async saveUserAnecdote(@Req() req: Request, @Query('anecdoteId') anecdoteId:number) {
        try {

            return await this.anecdoteService.saveUserAnecdote(
                req.user as User,
                anecdoteId,
            );
        } catch (error: any) {
            console.error('Failed to save user anecdote:', error.message);
            throw error;
        }
    }
    @Post('searchAnecdote')
    async searchAnecdoteByText(@Query() searchAnecdoteByTextDto:SearchAnecdoteByTextDto){
        return await this.anecdoteService.searchAnecdoteByText(searchAnecdoteByTextDto)
    }
}