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
            console.log(token)
            await this.jwtService.verifyAccessToken(token)
            console.log('WAS VERIFIED!')
            const userData = await this.jwtService.decodeToken(token);
            console.log(userData);
            const decoded_user_id = userData?.user_id ?? null;

            return await this.anecdotService.searchUserAnecdots(
                decoded_user_id,
                query['page'],
                query['sort'],
                query['order']
            );
        } catch (error: any) {
            console.log("Error during user's anecdote search");

            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException("Token expired");
            }

            if (error instanceof JsonWebTokenError) {
                throw new NotFoundException("Invalid token");
            }

            throw new InternalServerErrorException("An error occurred");
        }
    }


    @Post('user/save')
    async saveUserAnecdot(@Req() req: Request, @Query() query, @Body() body) {
        try {
            const token = body.accessToken;
            await this.jwtService.verifyAccessToken(token);
            const userData = await this.jwtService.decodeToken(token);
            const decoded_user_id = userData?.user_id ?? null;

            return await this.anecdotService.saveUserAnecdot(
                decoded_user_id,
                query['anecdot_id']
            );
        } catch (error: any) {
            console.error('Failed to extract user_id:', error.message);

            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException("Token expired");
            }

            if (error instanceof JsonWebTokenError) {
                throw new NotFoundException("Invalid token");
            }

            throw new InternalServerErrorException("An error occurred while saving the anecdote");
        }
    }
    @Post('searchAnecdote')
    async searchAnecdoteByText(@Query() query){
        return await this.anecdotService.searchAnecdoteByText(query['anecdote_text'])
    }
}