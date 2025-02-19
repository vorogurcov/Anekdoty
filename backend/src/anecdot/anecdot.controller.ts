import {Body, Controller, Post, Query, Req, UseGuards} from '@nestjs/common'
import {AnecdotService} from "./anecdot.service";
import {Request} from 'express'

@Controller()
export class AnecdotController{
    constructor(private readonly anecdotService:AnecdotService) {}

    @Post('search')
    async searchAnecdots(@Query() query){
        return await this.anecdotService.searchAnecdots(query['page'], query['sort'], query['order']);
    }

    @Post('user/search')
    async searchUserAnecdots(@Req() req: Request, @Query() query, @Body() body) {
        let decoded_user_id;

        try {
            const token = body.accessToken;
            console.log(token)
            const payloadBase64 = token.split('.')[1];
            const decoded = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
            console.log(decoded);
            decoded_user_id = decoded?.user_id ?? null;
        } catch (error:any) {
            console.error('Failed to extract user_id:', error.message);
            decoded_user_id = 404;
        }

        return await this.anecdotService.searchUserAnecdots(decoded_user_id,
            query['page'],
            query['sort'],
            query['order']
        );
    }

    @Post('user/save')
    async saveUserAnecdot(@Req() req: Request, @Query() query, @Body() body) {
        let decoded_user_id;

        try {
            const token = body.accessToken;
            console.log(token)
            const payloadBase64 = token.split('.')[1];
            const decoded = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
            console.log(decoded);
            decoded_user_id = decoded?.user_id ?? null;
        } catch (error:any) {
            console.error('Failed to extract user_id:', error.message);
            decoded_user_id = 404;
        }

        return await this.anecdotService.saveUserAnecdot(
            decoded_user_id,
            query['anecdot_id']
        );
    }
}