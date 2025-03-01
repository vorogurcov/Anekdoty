import {
    Body,
    Controller,
    InternalServerErrorException,
    NotFoundException,
    Post,
    Query,
    Req,
    UnauthorizedException
} from '@nestjs/common'
import {AnecdotService} from "./anecdot.service";
import {Request, Response} from 'express'
import {JwtService} from "../jwt/jwt.service";
import {JsonWebTokenError, TokenExpiredError} from "@nestjs/jwt";

@Controller()
export class AnecdotController{
    constructor(private readonly anecdotService:AnecdotService,
                private readonly jwtService:JwtService) {}

    @Post('search')
    async searchAnecdots(@Query() query){
        return await this.anecdotService.searchAnecdots(query['page'], query['sort'], query['order']);
    }

    @Post('user/search')
    async searchUserAnecdots(@Query() query, @Body() body) {
        try {
            const token = body.accessToken;
            const userData = await this.jwtService.decodeToken(token);
            const decoded_user_id = userData?.user_id ?? null;

            return await this.anecdotService.searchUserAnecdots(
                decoded_user_id,
                query['page'],
                query['sort'],
                query['order']
            );
        } catch (error: any) {
            console.log("Failed to search user anecdotes:",error.message);
            throw error;
        }
    }


    @Post('user/save')
    async saveUserAnecdot(@Req() req: Request, @Query() query, @Body() body) {
        try {
            const token = body.accessToken;
            const userData = await this.jwtService.decodeToken(token);
            const decoded_user_id = userData?.user_id ?? null;

            return await this.anecdotService.saveUserAnecdot(
                decoded_user_id,
                query['anecdot_id']
            );
        } catch (error: any) {
            console.error('Failed to save user anecdote:', error.message);
            throw error;
        }
    }
    @Post('searchAnecdote')
    async searchAnecdoteByText(@Query() query){
        return await this.anecdotService.searchAnecdoteByText(query['anecdote_text'])
    }
}