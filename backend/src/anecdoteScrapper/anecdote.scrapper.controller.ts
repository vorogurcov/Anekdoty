import {Controller,Get} from '@nestjs/common'
import {AnecdoteScrapperService} from "./anecdote.scrapper.service";


@Controller('anecdoteScrapper')
export class AnecdoteScrapperController {
    constructor(private readonly anecdoteServiceScrapper:AnecdoteScrapperService){}

    @Get('scrap')
    async scrap(){
        return await this.anecdoteServiceScrapper.scrap();
    }

    @Get('rubrics')
    async getRubrics(){
        return await this.anecdoteServiceScrapper.getRubrics();
    }
}

