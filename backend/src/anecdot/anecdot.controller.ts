import {Controller, Post, Query} from '@nestjs/common'
import {AnecdotService} from "./anecdot.service";

@Controller()
export class AnecdotController{
    constructor(private readonly anecdotService:AnecdotService) {}

    @Post('search')
    async searchAnecdots(@Query() query){
        return await this.anecdotService.searchAnecdots(query['page'], query['sort'], query['order']);
    }

    @Post('user/search')
    async searchUserAnecdots(@Query() query){
        return await this.anecdotService.searchUserAnecdots(query['id'],query['page'], query['sort'], query['order']);
    }

}