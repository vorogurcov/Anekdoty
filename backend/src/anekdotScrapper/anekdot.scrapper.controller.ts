import {Controller,Get} from '@nestjs/common'
import {AnekdotScrapperService} from "./anekdot.scrapper.service";


@Controller('anekdotScrapper')
export class AnekdotScrapperController {
    constructor(private readonly anekdotServiceScrapper:AnekdotScrapperService){}

    @Get('scrap')
    async scrap(){
        return await this.anekdotServiceScrapper.scrap();
    }

    @Get('get')
    async getAnekdoty(){
        return await this.anekdotServiceScrapper.getAnekdoty();
    }

}

